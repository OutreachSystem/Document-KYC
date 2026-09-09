"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Flag, ListFilter, Plus, Search } from "lucide-react";
import { CheckPill } from "@/components/ui/Badge";
import { Pagination } from "@/components/ui/Pagination";
import { FlagWithCode } from "@/components/ui/Flag";
import { StatusBadge } from "./StatusBadge";
import { AddVerificationModal } from "./AddVerificationModal";
import { formatDate, formatTime } from "@/lib/format";
import type { Verification, VerificationStatus } from "@/lib/data/idv";

const STATUS_FILTERS: (VerificationStatus | "ALL")[] = [
  "ALL",
  "PASSED",
  "REJECTED",
  "WARNING",
  "PENDING",
];

export function VerificationTable({
  rows,
  basePath,
  showChangeColumn = false,
}: {
  rows: Verification[];
  basePath: string;
  showChangeColumn?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<VerificationStatus | "ALL">("ALL");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      if (status !== "ALL" && row.status !== status) return false;
      if (!q) return true;
      return (
        row.name.toLowerCase().includes(q) ||
        row.country.toLowerCase().includes(q) ||
        row.documentType.toLowerCase().includes(q)
      );
    });
  }, [rows, query, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * perPage;
  const visible = filtered.slice(start, start + perPage);

  return (
    <div className="p-5">
      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search..."
              className="w-56 rounded-l-md border border-gray-200 bg-white py-2 pl-9 pr-3 text-xs outline-none transition focus:border-brand-500"
            />
          </div>
          <button className="-ml-2.5 rounded-r-md bg-brand-700 px-3 py-2 text-xs font-medium text-white transition hover:bg-brand-800">
            Search
          </button>

          <div className="relative">
            <button
              onClick={() => setFiltersOpen((o) => !o)}
              className="inline-flex items-center gap-2 rounded-md border border-brand-300 bg-white px-3 py-2 text-xs font-medium text-brand-700 transition hover:bg-brand-50"
            >
              <ListFilter className="h-3.5 w-3.5" /> Filters
            </button>
            {filtersOpen && (
              <div className="absolute left-0 top-full z-20 mt-2 w-52 animate-pop-in rounded-lg bg-white p-2 shadow-lg ring-1 ring-gray-200">
                <p className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                  Status
                </p>
                {STATUS_FILTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setStatus(s);
                      setPage(1);
                      setFiltersOpen(false);
                    }}
                    className={`block w-full rounded-md px-2 py-1.5 text-left text-xs transition ${
                      status === s
                        ? "bg-brand-50 font-semibold text-brand-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {s === "ALL" ? "All statuses" : s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand-800 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-900"
        >
          <Plus className="h-3.5 w-3.5" /> Add Verifications
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200/70">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="whitespace-nowrap border-b border-gray-100 text-left text-[10px] uppercase tracking-wide text-gray-400">
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-3 py-3 font-semibold">Document Type</th>
                <th className="px-3 py-3 font-semibold">Country</th>
                <th className="px-3 py-3 font-semibold">Source</th>
                <th className="px-3 py-3 text-center font-semibold">Status</th>
                <th className="px-3 py-3 text-center font-semibold">Verification</th>
                {showChangeColumn && (
                  <th className="px-3 py-3 text-center font-semibold">Change</th>
                )}
                <th className="px-5 py-3 text-right font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-50 text-xs transition last:border-0 hover:bg-gray-50/70"
                >
                  <td className="max-w-[260px] px-5 py-3">
                    <Link
                      href={`${basePath}/${row.id}`}
                      className="block truncate font-medium text-gray-800 hover:text-brand-700"
                    >
                      {row.name}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {row.documentType === "---" ? (
                      <span className="text-gray-400">---</span>
                    ) : (
                      <span className="text-brand-700">{row.documentType}</span>
                    )}
                  </td>
                  <td className="px-3 py-3">
                    <FlagWithCode code={row.country} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-gray-600">
                    {row.source}
                  </td>
                  <td className="px-3 py-3 text-center">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex justify-center gap-1">
                      {row.checks.map((check, i) => (
                        <CheckPill
                          key={`${check.label}-${i}`}
                          label={check.label}
                          state={check.state}
                        />
                      ))}
                    </div>
                  </td>
                  {showChangeColumn && (
                    <td className="px-3 py-3 text-center">
                      {row.flagged && (
                        <Flag className="mx-auto h-3.5 w-3.5 fill-rose-500 text-rose-500" />
                      )}
                    </td>
                  )}
                  <td className="whitespace-nowrap px-5 py-3 text-right">
                    <div className="text-[11px] font-semibold text-gray-700">
                      {formatDate(row.createdAt)}
                    </div>
                    <div className="text-[10px] text-gray-400">
                      {formatTime(row.createdAt)}
                    </div>
                  </td>
                </tr>
              ))}

              {visible.length === 0 && (
                <tr>
                  <td
                    colSpan={showChangeColumn ? 8 : 7}
                    className="px-5 py-16 text-center text-xs text-gray-400"
                  >
                    No verifications match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          page={safePage}
          totalPages={totalPages}
          perPage={perPage}
          totalResults={filtered.length}
          rangeStart={start + 1}
          rangeEnd={Math.min(start + perPage, filtered.length)}
          onPageChange={setPage}
          onPerPageChange={(n) => {
            setPerPage(n);
            setPage(1);
          }}
        />
      </div>

      <AddVerificationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
