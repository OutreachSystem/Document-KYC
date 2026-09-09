"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Copy,
  FileDown,
} from "lucide-react";
import { MediaThumb } from "./MediaThumb";
import { formatDateTimeLong } from "@/lib/format";
import type { Verification } from "@/lib/data/idv";
import {
  mediaItems,
  type CheckSummaryItem,
  type FieldRow,
} from "@/lib/data/verification-detail";
import { kycPersonalProfile } from "@/lib/data/verification-detail";

const statusChip: Record<string, string> = {
  PASSED: "bg-emerald-500",
  REJECTED: "bg-rose-500",
  WARNING: "bg-amber-500",
  PENDING: "bg-gray-400",
};

const resultChip: Record<CheckSummaryItem["result"], string> = {
  PASSED: "bg-emerald-50 text-emerald-700",
  FAILED: "bg-rose-50 text-rose-600",
  WARNING: "bg-amber-50 text-amber-700",
};

const resultDot: Record<CheckSummaryItem["result"], string> = {
  PASSED: "bg-emerald-500",
  FAILED: "bg-rose-500",
  WARNING: "bg-amber-500",
};

export function VerificationDetail({
  verification,
  backHref,
  fields,
  checks,
  showMrzColumns = true,
  showKycProfile = false,
}: {
  verification: Verification;
  backHref: string;
  fields: FieldRow[];
  checks: CheckSummaryItem[];
  showMrzColumns?: boolean;
  showKycProfile?: boolean;
}) {
  const [tab, setTab] = useState<"main" | "raw">("main");
  const [selectedMedia, setSelectedMedia] = useState(0);
  const [openSection, setOpenSection] = useState<string | null>(
    "Residence Information",
  );
  const [copied, setCopied] = useState(false);

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(verification.id);
    } catch {
      // Ignore clipboard permission errors in the demo.
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-5 pt-4">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={backHref}
            className="rounded-md p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
            aria-label="Back"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <span className="text-[13px] font-semibold text-gray-900">
            Verification {verification.id}
          </span>
          <span className="text-[13px] text-gray-700">{verification.name}</span>
          <button
            onClick={copyId}
            className="text-gray-400 transition hover:text-brand-600"
            aria-label="Copy verification id"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-600" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
          <span
            className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase text-white ${
              statusChip[verification.status]
            }`}
          >
            {verification.status}
          </span>

          <button
            className="ml-auto rounded-md border border-gray-200 p-1.5 text-gray-500 transition hover:bg-gray-50"
            aria-label="Download report"
          >
            <FileDown className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-1 pl-9 text-[10px] text-gray-400">
          Retrieve Date {formatDateTimeLong(verification.retrievedAt)} ·
          Verification Date {formatDateTimeLong(verification.createdAt)}
        </p>

        <div className="mt-3 flex gap-1">
          {(["main", "raw"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-t-md px-5 py-2 text-xs font-medium transition ${
                tab === t
                  ? "bg-white text-gray-900 shadow-[inset_0_-2px_0_0_var(--brand-600)]"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {t === "main" ? "Main Data" : "Raw"}
            </button>
          ))}
        </div>
      </div>

      {tab === "raw" ? (
        <div className="p-5">
          <pre className="overflow-auto rounded-xl bg-gray-900 p-5 text-[11px] leading-relaxed text-emerald-300 shadow-sm">
{JSON.stringify(
  {
    id: verification.id,
    reference: verification.reference,
    applicant: verification.name,
    document_type: verification.documentType,
    issuing_country: verification.country,
    source: verification.source,
    status: verification.status,
    checks: verification.checks,
    created_at: verification.createdAt,
    retrieved_at: verification.retrievedAt,
  },
  null,
  2,
)}
          </pre>
        </div>
      ) : (
        <div className="flex flex-col gap-4 p-4 xl:flex-row">
          {/* Media rail */}
          <div className="w-full shrink-0 xl:w-[104px]">
            <p className="mb-2 text-[11px] font-semibold text-gray-500">Media</p>
            <div className="flex gap-2 overflow-x-auto pb-2 xl:max-h-[calc(100vh-180px)] xl:flex-col xl:overflow-y-auto">
              {mediaItems.map((item, i) => (
                <button
                  key={item.label}
                  onClick={() => setSelectedMedia(i)}
                  className={`shrink-0 rounded-lg border-2 p-1 transition ${
                    selectedMedia === i
                      ? "border-brand-500 bg-brand-50"
                      : "border-transparent hover:border-gray-200"
                  }`}
                >
                  <MediaThumb
                    kind={item.kind}
                    seed={i}
                    className="h-[62px] w-[54px] rounded object-cover"
                  />
                  <span className="mt-1 block max-w-[54px] truncate text-[8px] text-gray-500">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Main column */}
          <div className="min-w-0 flex-1 space-y-4">
            <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200/70">
              <h2 className="text-[13px] font-bold text-gray-900">
                Identity & Evidence
              </h2>
              <p className="mt-0.5 text-[10px] text-gray-500">
                Review selfie, liveness, and document images.
              </p>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {(["face", "doc"] as const).map((kind, idx) => (
                  <div key={kind}>
                    <div className="flex h-[150px] items-center justify-center rounded-lg bg-gray-50 ring-1 ring-gray-100">
                      <MediaThumb
                        kind={kind}
                        seed={idx}
                        className={
                          kind === "face"
                            ? "h-[140px] w-[118px] rounded"
                            : "h-[110px] w-[176px] rounded"
                        }
                      />
                    </div>
                    <div className="mt-2 flex justify-center gap-2">
                      <button className="rounded border border-gray-200 px-3 py-1 text-[10px] text-gray-600 transition hover:bg-gray-50">
                        Previous
                      </button>
                      <button className="rounded border border-gray-200 px-3 py-1 text-[10px] text-gray-600 transition hover:bg-gray-50">
                        Next
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200/70">
              <h2 className="text-[13px] font-bold text-gray-900">
                ID Document Check
              </h2>
              <p className="mt-0.5 text-[10px] text-gray-500">
                This data was extracted automatically. Results might not clearly
                represent the actual data.
              </p>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[520px] border-collapse text-[10px]">
                  <thead>
                    <tr className="bg-gray-50 text-left text-gray-500">
                      <th className="border border-gray-100 px-2 py-1.5 font-semibold">
                        Forms
                      </th>
                      <th className="border border-gray-100 px-2 py-1.5 font-semibold">
                        MRZ
                      </th>
                      <th className="border border-gray-100 px-2 py-1.5 font-semibold">
                        Visual
                      </th>
                      {showMrzColumns ? (
                        <th className="border border-gray-100 px-2 py-1.5 font-semibold">
                          NFC DATA
                        </th>
                      ) : null}
                      <th className="w-8 border border-gray-100 px-2 py-1.5 font-semibold">
                        {showMrzColumns ? "MRZ-Viz" : "MRZ-Viz"}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {fields.map((row, i) => (
                      <tr key={`${row.field}-${i}`} className="align-top">
                        <td className="border border-gray-100 bg-gray-50/50 px-2 py-1.5 font-medium">
                          {row.field}
                        </td>
                        <td className="whitespace-pre-line border border-gray-100 px-2 py-1.5">
                          {row.mrz ?? ""}
                        </td>
                        <td
                          className="whitespace-pre-line border border-gray-100 px-2 py-1.5"
                          dir="auto"
                        >
                          {row.visual ?? ""}
                        </td>
                        {showMrzColumns ? (
                          <td
                            className="whitespace-pre-line border border-gray-100 px-2 py-1.5"
                            dir="auto"
                          >
                            {row.nfc ?? ""}
                          </td>
                        ) : null}
                        <td className="border border-gray-100 px-2 py-1.5 text-center">
                          {row.match && (
                            <Check
                              className="mx-auto h-3 w-3 text-emerald-500"
                              strokeWidth={3}
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Right rail */}
          <div className="w-full shrink-0 space-y-4 xl:w-[290px]">
            <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200/70">
              <h2 className="text-[13px] font-bold text-gray-900">
                Checks Summary
              </h2>
              <ul className="mt-4 space-y-4">
                {checks.map((check) => (
                  <li key={check.label}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2 text-[11px] font-semibold text-gray-800">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${resultDot[check.result]}`}
                        />
                        {check.label}
                      </span>
                      <span
                        className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${resultChip[check.result]}`}
                      >
                        {check.result}
                      </span>
                    </div>
                    <p className="mt-1 pl-3.5 text-[9px] leading-relaxed text-gray-400">
                      {check.description}
                    </p>

                    {check.label === "Facial Similarity" &&
                      check.result === "PASSED" && (
                        <div className="mt-2 pl-3.5">
                          <p className="text-[9px] text-gray-500">
                            Liveness - Visual:{" "}
                            <span className="font-semibold text-emerald-600">
                              PASSED
                            </span>
                          </p>
                          <p className="text-[9px] text-gray-500">
                            Face Match Similarity: 98%
                          </p>
                          <p className="text-[9px] text-gray-500">
                            Results Confidence: 20.99%
                          </p>
                          <p className="mt-2 text-[9px] font-semibold text-gray-700">
                            Facial Comparison images
                          </p>
                          <div className="mt-1.5 grid grid-cols-2 gap-2">
                            <div>
                              <p className="text-[8px] text-gray-400">
                                Reference image
                              </p>
                              <MediaThumb
                                kind="face"
                                seed={1}
                                className="mt-1 h-16 w-full rounded object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-[8px] text-gray-400">
                                Comparison image
                              </p>
                              <MediaThumb
                                kind="ghost"
                                seed={2}
                                className="mt-1 h-16 w-full rounded object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                  </li>
                ))}
              </ul>
            </section>

            {showKycProfile && (
              <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200/70">
                <h2 className="text-[13px] font-bold text-gray-900">
                  KYC Personal Profile
                </h2>

                <div className="mt-3 rounded-lg bg-gray-50 px-3 py-2 text-[10px] text-gray-500">
                  ID card revised content
                </div>

                <div className="mt-2 overflow-hidden rounded-lg ring-1 ring-gray-100">
                  <button
                    onClick={() =>
                      setOpenSection((s) =>
                        s === "Residence Information"
                          ? null
                          : "Residence Information",
                      )
                    }
                    className="flex w-full items-center justify-between bg-gray-50 px-3 py-2 text-[10px] font-semibold text-gray-700"
                  >
                    Residence Information
                    <ChevronDown
                      className={`h-3 w-3 transition-transform ${
                        openSection === "Residence Information" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openSection === "Residence Information" && (
                    <dl className="grid grid-cols-2 gap-x-3 gap-y-2.5 px-3 py-3">
                      {kycPersonalProfile.residence.map((item, i) => (
                        <div key={`${item.label}-${i}`}>
                          <dt className="text-[8px] uppercase tracking-wide text-gray-400">
                            {item.label}
                          </dt>
                          <dd className="truncate text-[10px] text-gray-700" dir="auto">
                            {item.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>

                {kycPersonalProfile.sections.map((section) => (
                  <button
                    key={section}
                    onClick={() =>
                      setOpenSection((s) => (s === section ? null : section))
                    }
                    className="mt-2 flex w-full items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-[10px] font-semibold text-gray-700 ring-1 ring-gray-100 transition hover:bg-gray-100"
                  >
                    {section}
                    <ChevronDown
                      className={`h-3 w-3 transition-transform ${
                        openSection === section ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ))}
              </section>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
