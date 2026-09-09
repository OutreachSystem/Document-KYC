"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Barcode,
  ChevronLeft,
  Copy,
  CreditCard,
  FileText,
  RotateCw,
  Sparkles,
  Table2,
  X,
} from "lucide-react";
import { IdCardPreview, PermitPreview } from "@/components/idp/DocumentPreview";
import { aiAgents, extractParagraphs } from "@/lib/data/idp";

const FORMAT_TABS = ["Markdown", "Text", "Table", "Barcode"] as const;
type FormatTab = (typeof FORMAT_TABS)[number];

function ParagraphCard({ text }: { text: string }) {
  return (
    <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-gray-200/70">
      <p className="text-[10px] font-semibold text-gray-700">Paragraph</p>
      <p className="mt-1.5 text-[11px] leading-relaxed text-gray-600" dir="auto">
        {text}
      </p>
    </div>
  );
}

export function ExtractView({
  fileName,
  fileType,
}: {
  fileName: string;
  fileType: "Image" | "PDF";
}) {
  const router = useRouter();
  const [tab, setTab] = useState<"extract" | "result">("extract");
  const [format, setFormat] = useState<FormatTab>("Text");
  const [agentsOpen, setAgentsOpen] = useState(false);
  const [rotation, setRotation] = useState(0);

  return (
    <div className="relative min-h-screen">
      {/* Tabs */}
      <div className="flex items-center gap-1 bg-gray-200/70 px-4 py-2">
        {(
          [
            ["extract", "Extract"],
            ["result", "Result"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`rounded-md px-5 py-1.5 text-xs transition ${
              tab === id
                ? "bg-white font-semibold text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-5 py-3">
        <button
          onClick={() => router.push("/idp")}
          className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-[11px] text-gray-700 shadow-sm transition hover:bg-gray-50"
        >
          <ChevronLeft className="h-3.5 w-3.5" /> Back
        </button>

        <div className="flex items-center gap-2">
          {[FileText, CreditCard, FileText, Copy].map((Icon, i) => (
            <button
              key={i}
              className="rounded-md border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition hover:bg-gray-50 hover:text-brand-600"
              aria-label="Toolbar action"
            >
              <Icon className="h-3.5 w-3.5" />
            </button>
          ))}
          <button
            onClick={() => setAgentsOpen(true)}
            className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-[11px] text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            AI Agents
            <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 gap-4 px-5 pb-8 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200/70">
          {fileType === "PDF" ? (
            <PermitPreview key={rotation} className="mx-auto w-full max-w-[220px]" />
          ) : (
            <IdCardPreview key={rotation} className="w-full rounded" />
          )}
          <p className="mt-2 truncate text-[10px] text-gray-400">{fileName}</p>
          <button
            onClick={() => setRotation((r) => r + 90)}
            className="mt-1 text-gray-400 transition hover:text-brand-600"
            aria-label="Rotate document"
          >
            <RotateCw
              className="h-3.5 w-3.5"
              style={{ transform: `rotate(${rotation}deg)` }}
            />
          </button>
        </div>

        <div className="rounded-xl bg-gray-100/80 p-4 ring-1 ring-gray-200/70">
          {tab === "extract" ? (
            <>
              <div className="flex flex-wrap gap-1.5">
                {FORMAT_TABS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    className={`rounded-md px-3 py-1.5 text-[11px] transition ${
                      format === f
                        ? "bg-gray-900 font-medium text-white"
                        : "bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                {format === "Text" && (
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div className="space-y-3">
                      {extractParagraphs.arabic.map((text, i) => (
                        <ParagraphCard key={i} text={text} />
                      ))}
                    </div>
                    <div className="space-y-3">
                      {extractParagraphs.english.map((text, i) => (
                        <ParagraphCard key={i} text={text} />
                      ))}
                    </div>
                  </div>
                )}

                {format === "Markdown" && (
                  <pre className="overflow-auto rounded-lg bg-white p-4 text-[11px] leading-relaxed text-gray-700 shadow-sm ring-1 ring-gray-200/70">
{`## Identity Card

**Issuing authority:** The Hashemite Kingdom of Jordan
Ministry of Interior — Civil Status & Passport Dept.

| Field | Value |
| --- | --- |
| Name | MOHAMMAD MUNEER MOHAMMAD ALQASEM |
| National number | 9871018201 |
| Date of birth | 28/12/1987 |
| Place of birth | Amman |
| Sex | M |
| Mother's name | Ahlam |`}
                  </pre>
                )}

                {format === "Table" && (
                  <div className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-200/70">
                    <table className="w-full text-[11px]">
                      <thead>
                        <tr className="bg-gray-50 text-left text-[10px] uppercase tracking-wide text-gray-400">
                          <th className="px-4 py-2 font-semibold">Field</th>
                          <th className="px-4 py-2 font-semibold">Value</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-700">
                        {[
                          ["Name", "MOHAMMAD MUNEER MOHAMMAD ALQASEM"],
                          ["National Number", "9871018201"],
                          ["Date of Birth", "28/12/1987"],
                          ["Place of Birth", "Amman"],
                          ["Sex", "M"],
                          ["Mother's Name", "Ahlam"],
                          ["Issuing Country", "Jordan"],
                        ].map(([field, value]) => (
                          <tr key={field} className="border-t border-gray-50">
                            <td className="px-4 py-2 font-medium">{field}</td>
                            <td className="px-4 py-2">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {format === "Barcode" && (
                  <div className="flex flex-col items-center gap-3 rounded-lg bg-white p-8 shadow-sm ring-1 ring-gray-200/70">
                    <Barcode className="h-16 w-40 text-gray-800" strokeWidth={1} />
                    <p className="font-mono text-[11px] text-gray-600">
                      IDJOR9871018201&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
                    </p>
                    <p className="text-[10px] text-gray-400">
                      1 barcode detected · PDF417
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-gray-200/70">
              <h3 className="flex items-center gap-2 text-[13px] font-bold text-gray-900">
                <Table2 className="h-4 w-4 text-brand-600" /> Structured Result
              </h3>
              <pre className="mt-3 overflow-auto rounded-lg bg-gray-900 p-4 text-[11px] leading-relaxed text-emerald-300">
{JSON.stringify(
  {
    document_type: "JOR-National-ID",
    confidence: 0.964,
    fields: {
      full_name: "MOHAMMAD MUNEER MOHAMMAD ALQASEM",
      national_number: "9871018201",
      date_of_birth: "1987-12-28",
      place_of_birth: "Amman",
      sex: "M",
      mothers_name: "Ahlam",
    },
    agents: ["OCR", "Veritas Engine"],
  },
  null,
  2,
)}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* AI Agents drawer */}
      {agentsOpen && (
        <>
          <div
            className="fixed inset-0 z-40 animate-fade-in bg-gray-900/25"
            onClick={() => setAgentsOpen(false)}
          />
          <aside className="fixed right-0 top-0 z-50 h-screen w-[215px] animate-slide-in-right border-l border-gray-200 bg-white p-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-900">
                <Sparkles className="h-3.5 w-3.5 text-brand-600" /> AI Agents
              </h3>
              <button
                onClick={() => setAgentsOpen(false)}
                className="text-gray-400 transition hover:text-gray-700"
                aria-label="Close AI agents"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {aiAgents.map((agent) => (
                <button
                  key={agent.name}
                  className="relative rounded-md border border-gray-200 px-2 py-2 text-[10px] text-gray-700 transition hover:border-brand-300 hover:bg-brand-50"
                >
                  {agent.name}
                  {agent.active && (
                    <span className="absolute right-1.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-fuchsia-500" />
                  )}
                </button>
              ))}
            </div>

            <p className="mt-3 text-[9px] leading-relaxed text-gray-400">
              Extraction is default. AI actions run on current selection or full
              page.
            </p>
          </aside>
        </>
      )}
    </div>
  );
}
