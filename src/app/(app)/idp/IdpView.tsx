"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Check,
  FileImage,
  FileText,
  ListFilter,
  Upload,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Pagination } from "@/components/ui/Pagination";
import { formatDate, formatTime } from "@/lib/format";
import { documentRecords, templateRecords } from "@/lib/data/idp";

const agentStyles: Record<string, string> = {
  OCR: "bg-sky-100 text-sky-700",
  "Veritas Engine": "bg-amber-100 text-amber-700",
  "Lingua Trace": "bg-fuchsia-100 text-fuchsia-700",
  MedSense: "bg-emerald-100 text-emerald-700",
  Financials: "bg-indigo-100 text-indigo-700",
};

function TypeCell({ type }: { type: "Image" | "PDF" }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] text-gray-600">
      {type === "Image" ? (
        <FileImage className="h-3.5 w-3.5 text-sky-500" />
      ) : (
        <FileText className="h-3.5 w-3.5 text-rose-500" />
      )}
      {type}
    </span>
  );
}

function UploadModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <Modal open={open} onClose={onClose} className="max-w-md">
      <div className="p-6">
        <h2 className="text-[13px] font-semibold text-gray-800">
          Upload Document
        </h2>

        <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/70 px-6 py-10 text-center transition hover:border-brand-300 hover:bg-brand-50/40">
          <Upload className="h-6 w-6 text-gray-400" />
          <span className="mt-3 text-[12px] text-gray-600">
            Click to upload or drag and drop
          </span>
          <span className="mt-1 text-[10px] text-gray-400">
            Pdf/Img 50 MB · Excel 4 MB
          </span>
          {fileName && (
            <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600">
              <Check className="h-3.5 w-3.5" /> {fileName}
            </span>
          )}
          <input
            type="file"
            className="hidden"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
          />
        </label>

        <div className="mt-5 flex justify-center gap-3">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-200 px-5 py-2 text-[12px] text-gray-600 transition hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="rounded-md bg-brand-500 px-5 py-2 text-[12px] font-medium text-white transition hover:bg-brand-600"
          >
            Use file
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function IdpView() {
  const [tab, setTab] = useState<"nexus" | "template">("nexus");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  const rows = useMemo(() => documentRecords, []);
  const totalPages = Math.max(1, Math.ceil(rows.length / perPage));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * perPage;
  const visible = rows.slice(start, start + perPage);

  return (
    <div>
      {/* Tab bar */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-2.5">
        <div className="flex gap-1">
          {(
            [
              ["nexus", "Nexus Layout"],
              ["template", "Template Sentinel"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              onClick={() => {
                setTab(id);
                setPage(1);
              }}
              className={`rounded-md px-3 py-1.5 text-xs transition ${
                tab === id
                  ? "font-semibold text-gray-900 underline decoration-brand-600 decoration-2 underline-offset-[7px]"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setUploadOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand-800 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-900"
        >
          <Upload className="h-3.5 w-3.5" /> Upload Document
        </button>
      </div>

      <div className="p-5">
        <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200/70">
          <div className="flex items-center justify-between px-5 py-4">
            <h2 className="text-[13px] font-semibold text-gray-800">
              {tab === "nexus" ? "Document Scan" : "Template Document Records"}
            </h2>
            <button className="inline-flex items-center gap-2 rounded-md border border-brand-300 bg-white px-3 py-1.5 text-[11px] font-medium text-brand-700 transition hover:bg-brand-50">
              <ListFilter className="h-3.5 w-3.5" /> Filters
            </button>
          </div>

          <div className="overflow-x-auto">
            {tab === "nexus" ? (
              <table className="w-full min-w-[840px]">
                <thead>
                  <tr className="border-y border-gray-100 text-left text-[10px] uppercase tracking-wide text-gray-400">
                    <th className="px-5 py-2.5 font-semibold">File Name</th>
                    <th className="px-4 py-2.5 font-semibold">Type</th>
                    <th className="px-4 py-2.5 font-semibold">Owner</th>
                    <th className="px-4 py-2.5 font-semibold">Created At</th>
                    <th className="px-4 py-2.5 font-semibold">Status</th>
                    <th className="px-4 py-2.5 font-semibold">AI Agents</th>
                    <th className="px-5 py-2.5 text-right font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((doc) => (
                    <tr
                      key={doc.id}
                      className="border-b border-gray-50 text-[11px] transition last:border-0 hover:bg-gray-50/70"
                    >
                      <td className="max-w-[280px] truncate px-5 py-2.5 text-gray-800">
                        {doc.fileName}
                      </td>
                      <td className="px-4 py-2.5">
                        <TypeCell type={doc.type} />
                      </td>
                      <td className="px-4 py-2.5 text-gray-500">{doc.owner}</td>
                      <td className="whitespace-nowrap px-4 py-2.5">
                        <div className="font-semibold text-gray-700">
                          {formatDate(doc.createdAt)}
                        </div>
                        <div className="text-[10px] text-gray-400">
                          {formatTime(doc.createdAt)}
                        </div>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                          <Check className="h-3 w-3" strokeWidth={3} />
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex flex-col items-start gap-1">
                          {doc.agents.map((agent) => (
                            <span
                              key={agent}
                              className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                                agentStyles[agent] ?? "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {agent}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-2.5 text-right">
                        <Link
                          href={`/idp/${doc.id}`}
                          className="inline-block rounded-md border border-gray-200 px-3 py-1 text-[10px] text-gray-600 transition hover:border-brand-300 hover:text-brand-700"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full min-w-[760px]">
                <thead>
                  <tr className="border-y border-gray-100 text-left text-[10px] uppercase tracking-wide text-gray-400">
                    <th className="px-5 py-2.5 font-semibold">File Name</th>
                    <th className="px-4 py-2.5 font-semibold">Type</th>
                    <th className="px-4 py-2.5 font-semibold">Owner</th>
                    <th className="px-4 py-2.5 font-semibold">Confidence</th>
                    <th className="px-4 py-2.5 font-semibold">Created At</th>
                    <th className="px-5 py-2.5 text-right font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {templateRecords.map((tpl) => (
                    <tr
                      key={tpl.id}
                      className="border-b border-gray-50 text-[11px] transition last:border-0 hover:bg-gray-50/70"
                    >
                      <td className="px-5 py-3 text-gray-800">{tpl.fileName}</td>
                      <td className="px-4 py-3">
                        <TypeCell type={tpl.type} />
                      </td>
                      <td className="px-4 py-3 text-gray-500">{tpl.owner}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-semibold text-brand-700">
                          {tpl.confidence}%
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <div className="font-semibold text-gray-700">
                          {formatDate(tpl.createdAt)}
                        </div>
                        <div className="text-[10px] text-gray-400">
                          {formatTime(tpl.createdAt)}
                        </div>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <Link
                          href={`/idp/template/${tpl.id}`}
                          className="inline-block rounded-md border border-gray-200 px-3 py-1 text-[10px] text-gray-600 transition hover:border-brand-300 hover:text-brand-700"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {tab === "nexus" ? (
            <Pagination
              page={safePage}
              totalPages={totalPages}
              perPage={perPage}
              totalResults={rows.length}
              rangeStart={start + 1}
              rangeEnd={Math.min(start + perPage, rows.length)}
              onPageChange={setPage}
              onPerPageChange={(n) => {
                setPerPage(n);
                setPage(1);
              }}
            />
          ) : (
            <Pagination
              page={1}
              totalPages={1}
              perPage={25}
              totalResults={templateRecords.length}
              rangeStart={1}
              rangeEnd={templateRecords.length}
              onPageChange={() => {}}
              onPerPageChange={() => {}}
            />
          )}
        </div>
      </div>

      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />
    </div>
  );
}
