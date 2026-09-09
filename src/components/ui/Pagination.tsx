"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

function pageWindow(current: number, total: number): (number | "gap")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, "gap", total - 2, total - 1, total];
  if (current >= total - 2)
    return [1, 2, 3, "gap", total - 2, total - 1, total];
  return [1, "gap", current - 1, current, current + 1, "gap", total];
}

export function Pagination({
  page,
  totalPages,
  perPage,
  totalResults,
  rangeStart,
  rangeEnd,
  onPageChange,
  onPerPageChange,
}: {
  page: number;
  totalPages: number;
  perPage: number;
  totalResults: number;
  rangeStart: number;
  rangeEnd: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}) {
  const pages = pageWindow(page, Math.max(totalPages, 1));

  return (
    <div className="flex flex-wrap items-center justify-end gap-4 border-t border-gray-100 px-4 py-3 text-xs text-gray-600">
      <div className="flex items-center gap-2">
        <span>Show per page</span>
        <select
          value={perPage}
          onChange={(e) => onPerPageChange(Number(e.target.value))}
          className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs outline-none focus:border-brand-500"
        >
          {[10, 25, 50, 100].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <span>
        Showing {totalResults === 0 ? 0 : rangeStart} to {rangeEnd} of{" "}
        {totalResults.toLocaleString()} results
      </span>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="rounded-md border border-gray-200 p-1.5 text-gray-500 transition hover:bg-gray-50 disabled:opacity-40"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>

        {pages.map((p, i) =>
          p === "gap" ? (
            <span key={`gap-${i}`} className="px-1 text-gray-400">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`h-7 min-w-7 rounded-md border px-2 text-xs transition ${
                p === page
                  ? "border-brand-600 bg-brand-600 font-semibold text-white"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {p}
            </button>
          ),
        )}

        <button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
          className="rounded-md border border-gray-200 p-1.5 text-gray-500 transition hover:bg-gray-50 disabled:opacity-40"
          aria-label="Next page"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
