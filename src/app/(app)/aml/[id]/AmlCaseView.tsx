"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Share2 } from "lucide-react";
import { Pagination } from "@/components/ui/Pagination";
import { amlCase } from "@/lib/data/aml";

export function AmlCaseView({
  entity,
  results,
}: {
  entity: string;
  results: number;
}) {
  const [monitored, setMonitored] = useState(true);
  const [risk, setRisk] = useState("Unknown");
  const candidateCount = Math.max(1, Math.min(results, 3));
  const candidates = Array.from({ length: candidateCount }, (_, i) => ({
    ...amlCase.candidates[0],
    name:
      i === 0
        ? amlCase.candidates[0].name
        : `${amlCase.candidates[0].name} (alias ${i + 1})`,
  }));

  return (
    <div className="p-5">
      <Link
        href="/aml"
        className="inline-flex items-center gap-1 text-[11px] text-gray-500 transition hover:text-brand-700"
      >
        <ChevronLeft className="h-3.5 w-3.5" /> All cases
      </Link>

      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Case &apos;{entity}&apos;
          </h1>
          <p className="mt-0.5 text-[11px] text-gray-500">
            {candidateCount} result{candidateCount === 1 ? "" : "s"}
          </p>
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <button className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-[11px] text-gray-700 shadow-sm transition hover:bg-gray-50">
            Share <Share2 className="h-3 w-3" />
          </button>

          <div className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 shadow-sm">
            <span className="text-[11px] text-gray-700">Monitor case</span>
            <button
              onClick={() => setMonitored((m) => !m)}
              aria-label="Toggle monitoring"
              className={`relative inline-flex h-4 w-8 items-center rounded-full transition ${
                monitored ? "bg-emerald-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute h-3 w-3 rounded-full bg-white transition ${
                  monitored ? "left-[18px]" : "left-0.5"
                }`}
              />
            </button>
          </div>

          <div>
            <p className="mb-1 text-[9px] text-gray-500">Assigned to</p>
            <span className="inline-block rounded-md border border-gray-200 bg-white px-3 py-2 text-[11px] text-gray-700 shadow-sm">
              {amlCase.assignedTo}
            </span>
          </div>

          <div>
            <p className="mb-1 text-[9px] text-gray-500">Risk level</p>
            <select
              value={risk}
              onChange={(e) => setRisk(e.target.value)}
              className="rounded-md border border-gray-200 bg-white px-3 py-2 text-[11px] text-gray-700 shadow-sm outline-none focus:border-brand-500"
            >
              {["Unknown", "Low", "Medium", "High"].map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <p className="mb-1 text-[9px] text-gray-500">Match Status</p>
            <span className="inline-block rounded-md bg-amber-50 px-3 py-2 text-[11px] font-semibold text-amber-700 ring-1 ring-amber-200">
              {amlCase.matchStatus}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-white shadow-sm ring-1 ring-gray-200/70">
        <Pagination
          page={1}
          totalPages={1}
          perPage={25}
          totalResults={candidateCount}
          rangeStart={1}
          rangeEnd={candidateCount}
          onPageChange={() => {}}
          onPerPageChange={() => {}}
        />
      </div>

      <div className="mt-4 space-y-4">
        {candidates.map((candidate, i) => (
          <div
            key={i}
            className="max-w-2xl overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200/70"
          >
            <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 px-5 py-3">
              <span className="text-[13px] font-bold text-gray-900">
                Candidate
              </span>
              {candidate.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-gray-100 px-2 py-0.5 text-[10px] text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="px-5 py-4">
              <p className="text-[10px] text-gray-500">Name</p>
              <p className="text-[13px] font-bold text-gray-900">
                {candidate.name}
              </p>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-gray-100 px-3 py-2">
                  <p className="text-[10px] text-gray-500">Relevance</p>
                  <span className="mt-1 inline-block rounded bg-amber-50 px-2 py-0.5 text-[10px] text-amber-700">
                    {candidate.relevance}
                  </span>
                </div>
                <div className="rounded-lg border border-gray-100 px-3 py-2">
                  <p className="text-[10px] text-gray-500">Countries</p>
                  <p className="mt-1 text-[12px] font-semibold text-gray-800">
                    {candidate.countries}
                  </p>
                </div>
              </div>

              <button className="mt-3 rounded-md border border-gray-200 px-3 py-1.5 text-[11px] text-gray-700 transition hover:bg-gray-50">
                Open source
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl bg-white shadow-sm ring-1 ring-gray-200/70">
        <Pagination
          page={1}
          totalPages={1}
          perPage={25}
          totalResults={candidateCount}
          rangeStart={1}
          rangeEnd={candidateCount}
          onPageChange={() => {}}
          onPerPageChange={() => {}}
        />
      </div>
    </div>
  );
}
