"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Download,
  ListFilter,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Pagination } from "@/components/ui/Pagination";
import { formatDateTimeLong } from "@/lib/format";
import {
  amlTotalResults,
  amlTransactions,
  fuzzinessOptions,
  type AmlResult,
} from "@/lib/data/aml";

const resultStyles: Record<AmlResult, string> = {
  No_match: "bg-emerald-100 text-emerald-700",
  Potential_match: "bg-amber-100 text-amber-700",
  False_positive: "bg-sky-100 text-sky-700",
};

function ManualLookupModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [entity, setEntity] = useState("");
  const [fuzziness, setFuzziness] = useState(fuzzinessOptions[0]);

  return (
    <Modal open={open} onClose={onClose} className="max-w-md">
      <div className="px-8 py-7">
        <h2 className="text-center text-[15px] font-bold text-gray-900">
          Manual Lookup
        </h2>
        <p className="mt-1.5 text-center text-[10px] text-gray-500">
          Enter the entity name and fuzziness level to perform a manual lookup
          search.
        </p>

        <label className="mt-5 block text-[10px] text-gray-600">
          Entity Name
        </label>
        <input
          value={entity}
          onChange={(e) => setEntity(e.target.value)}
          placeholder="Enter entity name"
          className="mt-1 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-[11px] outline-none transition focus:border-brand-500 focus:bg-white"
        />

        <label className="mt-4 block text-[10px] text-gray-600">
          Fuzziness
        </label>
        <select
          value={fuzziness}
          onChange={(e) => setFuzziness(e.target.value)}
          className="mt-1 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-[11px] outline-none focus:border-brand-500"
        >
          {fuzzinessOptions.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={onClose}
            className="rounded-md bg-rose-600 px-5 py-1.5 text-[11px] font-medium text-white transition hover:bg-rose-700"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="rounded-md bg-brand-700 px-5 py-1.5 text-[11px] font-medium text-white transition hover:bg-brand-800"
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function AmlView() {
  const [tab, setTab] = useState<"transactions" | "bulk">("transactions");
  const [lookupOpen, setLookupOpen] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(50);

  const rows = useMemo(() => amlTransactions, []);
  const totalPages = Math.ceil(amlTotalResults / perPage);
  const safePage = Math.min(page, totalPages);
  const start = ((safePage - 1) * perPage) % Math.max(1, rows.length - perPage);
  const visible = rows.slice(start, start + perPage);

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const allVisibleSelected =
    visible.length > 0 && visible.every((r) => selected.has(r.id));

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-white px-5 py-2.5">
        <div className="flex items-center gap-1">
          {(
            [
              ["transactions", "Transactions"],
              ["bulk", "Bulk Upload"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`rounded-md px-3 py-1.5 text-xs transition ${
                tab === id
                  ? "font-semibold text-gray-900 underline decoration-brand-600 decoration-2 underline-offset-[7px]"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {label}
            </button>
          ))}
          <button className="ml-2 inline-flex items-center gap-1.5 rounded-md border border-brand-300 px-3 py-1.5 text-[11px] font-medium text-brand-700 transition hover:bg-brand-50">
            <ListFilter className="h-3 w-3" /> Filters
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="rounded-md border border-gray-200 p-1.5 text-gray-500 transition hover:bg-gray-50"
            aria-label="Export"
          >
            <Download className="h-3.5 w-3.5" />
          </button>
          <button
            className="rounded-md border border-gray-200 p-1.5 text-gray-500 transition hover:bg-gray-50"
            aria-label="Delete selected"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          <span className="text-[11px] text-gray-500">
            {selected.size} selected
          </span>
          <button
            onClick={() => setLookupOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-md bg-brand-800 px-3.5 py-2 text-[11px] font-semibold text-white shadow-sm transition hover:bg-brand-900"
          >
            <Search className="h-3.5 w-3.5" /> Manual Search
          </button>
        </div>
      </div>

      {tab === "bulk" ? (
        <div className="p-5">
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-white px-6 py-24 text-center">
            <RefreshCw className="h-7 w-7 text-gray-300" />
            <p className="mt-4 text-[13px] font-semibold text-gray-700">
              Bulk screening upload
            </p>
            <p className="mt-1 text-[11px] text-gray-500">
              Upload a CSV of entities to screen them against sanctions, PEP and
              adverse media lists in one batch.
            </p>
            <button className="mt-5 rounded-md bg-brand-700 px-4 py-2 text-[11px] font-medium text-white transition hover:bg-brand-800">
              Select CSV file
            </button>
          </div>
        </div>
      ) : (
        <div className="p-5">
          <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200/70">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-gray-100 text-left text-[10px] uppercase tracking-wide text-gray-400">
                    <th className="w-10 px-4 py-2.5">
                      <input
                        type="checkbox"
                        checked={allVisibleSelected}
                        onChange={() =>
                          setSelected((prev) => {
                            const next = new Set(prev);
                            if (allVisibleSelected)
                              visible.forEach((r) => next.delete(r.id));
                            else visible.forEach((r) => next.add(r.id));
                            return next;
                          })
                        }
                        className="h-3.5 w-3.5 accent-[var(--brand-600)]"
                      />
                    </th>
                    <th className="px-4 py-2.5 font-semibold">Entity</th>
                    <th className="px-4 py-2.5 font-semibold">Fuzziness Level</th>
                    <th className="px-4 py-2.5 font-semibold">Results</th>
                    <th className="px-4 py-2.5 font-semibold">Status</th>
                    <th className="px-4 py-2.5 font-semibold">Risk</th>
                    <th className="px-4 py-2.5 font-semibold">Created At</th>
                    <th className="px-4 py-2.5 text-center font-semibold">Monitor</th>
                    <th className="px-5 py-2.5 text-right font-semibold">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-gray-50 text-[11px] transition last:border-0 hover:bg-gray-50/70"
                    >
                      <td className="px-4 py-2">
                        <input
                          type="checkbox"
                          checked={selected.has(row.id)}
                          onChange={() => toggle(row.id)}
                          className="h-3.5 w-3.5 accent-[var(--brand-600)]"
                        />
                      </td>
                      <td className="max-w-[260px] truncate px-4 py-2 font-medium text-gray-800">
                        {row.entity}
                      </td>
                      <td className="px-4 py-2 text-gray-600">{row.fuzziness}</td>
                      <td className="px-4 py-2 text-gray-700">{row.results}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`rounded px-2 py-1 text-[10px] font-semibold ${resultStyles[row.status]}`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="rounded bg-gray-100 px-2 py-1 text-[10px] text-gray-600">
                          {row.risk}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-500">
                        {formatDateTimeLong(row.createdAt)}
                      </td>
                      <td className="px-4 py-2">
                        <div className="mx-auto flex w-9 justify-center">
                          <span
                            className={`relative inline-flex h-4 w-8 items-center rounded-full transition ${
                              row.monitored ? "bg-emerald-500" : "bg-gray-300"
                            }`}
                          >
                            <span
                              className={`absolute h-3 w-3 rounded-full bg-white transition ${
                                row.monitored ? "left-[18px]" : "left-0.5"
                              }`}
                            />
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-2 text-right">
                        <Link
                          href={`/aml/${row.id}`}
                          className="inline-block rounded-md border border-gray-200 px-3 py-1 text-[10px] text-gray-600 transition hover:border-brand-300 hover:text-brand-700"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              page={safePage}
              totalPages={totalPages}
              perPage={perPage}
              totalResults={amlTotalResults}
              rangeStart={(safePage - 1) * perPage + 1}
              rangeEnd={Math.min(safePage * perPage, amlTotalResults)}
              onPageChange={setPage}
              onPerPageChange={(n) => {
                setPerPage(n);
                setPage(1);
              }}
            />
          </div>
        </div>
      )}

      <ManualLookupModal open={lookupOpen} onClose={() => setLookupOpen(false)} />
    </div>
  );
}
