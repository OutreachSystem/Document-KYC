import type { Metadata } from "next";
import Link from "next/link";
import {
  CircleAlert,
  CircleCheck,
  Clock,
  FolderOpen,
  Plus,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { kybCases, kybStats } from "@/lib/data/kyb";

export const metadata: Metadata = { title: "KYB — Document KYC" };

const icons = {
  folder: FolderOpen,
  clock: Clock,
  check: CircleCheck,
  alert: CircleAlert,
};

const iconColors = {
  folder: "text-brand-600",
  clock: "text-amber-500",
  check: "text-emerald-500",
  alert: "text-rose-500",
};

const riskStyles = {
  LOW: "bg-emerald-100 text-emerald-700",
  MEDIUM: "bg-amber-100 text-amber-700",
  HIGH: "bg-rose-100 text-rose-700",
};

const statusStyles = {
  "Pending Review": "bg-amber-50 text-amber-700",
  "Complete - Approved": "bg-emerald-50 text-emerald-700",
  "Rejected - Manual Freeze": "bg-rose-50 text-rose-600",
};

export default function KybPage() {
  return (
    <div className="p-5">
      <div className="mb-4 flex justify-end">
        <button className="inline-flex items-center gap-1.5 rounded-lg bg-brand-800 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-900">
          <Plus className="h-3.5 w-3.5" /> Create
        </button>
      </div>

      <Card className="p-5">
        <h1 className="text-[17px] font-bold text-gray-900">
          KYB Case Transactions Overview
        </h1>
        <p className="mt-1 text-[11px] text-gray-500">
          Track and manage all submitted Know Your Business applications.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kybStats.map((stat) => {
            const Icon = icons[stat.icon];
            return (
              <div
                key={stat.label}
                className="flex items-center gap-3 rounded-xl border border-gray-100 px-4 py-3.5"
              >
                <Icon className={`h-4 w-4 ${iconColors[stat.icon]}`} />
                <div>
                  <p className="text-[11px] text-gray-500">{stat.label}</p>
                  <p className="text-[15px] font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="bg-gray-50 text-left text-[10px] uppercase tracking-wide text-gray-400">
                <th className="rounded-l-lg px-4 py-2.5 font-semibold">Case ID</th>
                <th className="px-4 py-2.5 font-semibold">Company Name</th>
                <th className="px-4 py-2.5 font-semibold">Country</th>
                <th className="px-4 py-2.5 font-semibold">Risk Score</th>
                <th className="px-4 py-2.5 font-semibold">Status</th>
                <th className="px-4 py-2.5 font-semibold">Submission Date</th>
                <th className="rounded-r-lg px-4 py-2.5 text-right font-semibold" />
              </tr>
            </thead>
            <tbody>
              {kybCases.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-gray-50 text-[11px] last:border-0"
                >
                  <td className="px-4 py-3 font-semibold text-gray-800">
                    {c.id}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{c.company}</td>
                  <td className="px-4 py-3 text-gray-600">{c.country}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded px-2 py-1 text-[9px] font-bold ${riskStyles[c.risk]}`}
                    >
                      {c.risk}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded px-2.5 py-1 text-[10px] font-semibold ${statusStyles[c.status]}`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{c.submittedAt}</td>
                  <td className="px-4 py-3 text-right">
                    {c.archived ? (
                      <span className="text-[11px] text-gray-400">Archived</span>
                    ) : (
                      <Link
                        href="/kyb"
                        className="text-[11px] font-medium text-brand-700 hover:underline"
                      >
                        Review ›
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
