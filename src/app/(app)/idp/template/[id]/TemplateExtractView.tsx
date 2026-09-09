"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, CreditCard, FileText, RotateCw } from "lucide-react";
import { PermitPreview } from "@/components/idp/DocumentPreview";
import { templateExtractFields } from "@/lib/data/idp";

export function TemplateExtractView({ fileName }: { fileName: string }) {
  const router = useRouter();
  const [tab, setTab] = useState<"extract" | "result">("extract");
  const [rotation, setRotation] = useState(0);

  return (
    <div>
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

      <div className="flex items-center justify-between px-5 py-3">
        <button
          onClick={() => router.push("/idp")}
          className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-[11px] text-gray-700 shadow-sm transition hover:bg-gray-50"
        >
          <ChevronLeft className="h-3.5 w-3.5" /> Back
        </button>

        <div className="flex items-center gap-2">
          {[FileText, CreditCard].map((Icon, i) => (
            <button
              key={i}
              className="rounded-md border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition hover:bg-gray-50 hover:text-brand-600"
              aria-label="Toolbar action"
            >
              <Icon className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 px-5 pb-8 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200/70">
          <PermitPreview className="mx-auto w-full max-w-[300px]" />
          <p className="mt-3 truncate text-[10px] text-gray-400">{fileName}</p>
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

        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200/70">
          <span className="inline-block rounded bg-gray-900 px-3 py-1 text-[11px] font-medium text-white">
            Main
          </span>

          <p className="mt-3 text-[11px] font-bold text-gray-800">
            DocType:{" "}
            <span className="font-normal text-brand-700">
              {templateExtractFields.docType}
            </span>
          </p>
          <p className="mt-1 text-[11px] font-bold text-gray-800">
            Document type confidence Result:{" "}
            <span className="font-semibold text-amber-600">
              {templateExtractFields.confidence}
            </span>
          </p>

          <div className="mt-3 max-h-[440px] overflow-auto rounded-lg ring-1 ring-gray-200">
            <table className="w-full border-collapse text-[11px]">
              <thead className="sticky top-0 bg-white">
                <tr className="text-left text-gray-600">
                  <th className="border border-gray-200 px-3 py-2 font-semibold">
                    Forms
                  </th>
                  <th className="border border-gray-200 px-3 py-2 font-semibold">
                    Visual
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {templateExtractFields.rows.map((row) => (
                  <tr key={row.form}>
                    <td className="border border-gray-200 px-3 py-2">
                      {row.form}
                    </td>
                    <td className="border border-gray-200 px-3 py-2" dir="auto">
                      {row.visual}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
