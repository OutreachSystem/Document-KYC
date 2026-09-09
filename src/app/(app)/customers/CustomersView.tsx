"use client";

import { useState } from "react";
import { ChevronDown, MoreVertical } from "lucide-react";
import { Pagination } from "@/components/ui/Pagination";
import { AddClientModal } from "./AddClientModal";
import { customers, productTagStyles } from "@/lib/data/customers";

function Avatar({ name }: { name: string }) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";
  const hues = [212, 258, 172, 24, 330, 140];
  const hue = hues[name.length % hues.length];
  return (
    <span
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold"
      style={{
        backgroundColor: `hsl(${hue} 60% 92%)`,
        color: `hsl(${hue} 45% 38%)`,
      }}
    >
      {initial}
    </span>
  );
}

function UsageBar({ label, percent }: { label: string; percent: number }) {
  const color =
    percent >= 70 ? "bg-rose-500" : percent >= 30 ? "bg-emerald-500" : "bg-emerald-400";
  return (
    <div className="w-24">
      <p className="text-[9px] text-gray-500">{label}</p>
      <div className="mt-0.5 h-1 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
      </div>
      <p className="mt-0.5 text-[9px] text-gray-500">{percent}%</p>
    </div>
  );
}

export function CustomersView() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState<"cloud" | "onprem" | null>(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [openRow, setOpenRow] = useState<string | null>(null);

  const totalPages = Math.max(1, Math.ceil(customers.length / perPage));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * perPage;
  const visible = customers.slice(start, start + perPage);

  return (
    <div className="p-5">
      <div className="mb-4 flex justify-end">
        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-800 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-900"
          >
            Add Client <ChevronDown className="h-3.5 w-3.5" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full z-20 mt-1.5 w-44 animate-pop-in overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-gray-200">
              <button
                onClick={() => {
                  setModal("cloud");
                  setMenuOpen(false);
                }}
                className="block w-full px-4 py-2.5 text-left text-[11px] text-gray-700 transition hover:bg-gray-50"
              >
                Add Client(Cloud)
              </button>
              <button
                onClick={() => {
                  setModal("onprem");
                  setMenuOpen(false);
                }}
                className="block w-full px-4 py-2.5 text-left text-[11px] text-gray-700 transition hover:bg-gray-50"
              >
                Add Client(on-prem)
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200/70">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px]">
            <thead>
              <tr className="border-b border-gray-100 text-left text-[10px] uppercase tracking-wide text-gray-400">
                <th className="px-5 py-3 font-semibold">User</th>
                <th className="px-4 py-3 font-semibold">Company</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Products</th>
                <th className="px-4 py-3 font-semibold">Product Usage</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-gray-50 text-[11px] transition last:border-0 hover:bg-gray-50/70"
                >
                  <td className="whitespace-nowrap px-5 py-3">
                    <span className="flex items-center gap-2.5">
                      <Avatar name={c.user} />
                      <span className="font-medium text-gray-800">{c.user}</span>
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                    {c.company}
                  </td>
                  <td className="max-w-[190px] truncate px-4 py-3 text-gray-500">
                    {c.email}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex w-[152px] flex-wrap gap-1">
                      {c.products.map((p) => (
                        <span
                          key={p}
                          className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${productTagStyles[p]}`}
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {c.usage ? (
                      <UsageBar label={c.usage.label} percent={c.usage.percent} />
                    ) : (
                      <span className="text-[10px] text-gray-400">No usage</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${
                        c.type.startsWith("Live")
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {c.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${
                        c.status === "Active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-rose-50 text-rose-600"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="relative px-5 py-3 text-right">
                    <button
                      onClick={() =>
                        setOpenRow((r) => (r === c.id ? null : c.id))
                      }
                      className="text-gray-400 transition hover:text-gray-700"
                      aria-label="Row actions"
                    >
                      <MoreVertical className="h-3.5 w-3.5" />
                    </button>
                    {openRow === c.id && (
                      <div className="absolute right-5 top-full z-20 mt-1 w-32 animate-pop-in overflow-hidden rounded-lg bg-white text-left shadow-lg ring-1 ring-gray-200">
                        {["View details", "Edit client", "Suspend"].map((a) => (
                          <button
                            key={a}
                            onClick={() => setOpenRow(null)}
                            className="block w-full px-3 py-2 text-left text-[10px] text-gray-700 transition hover:bg-gray-50"
                          >
                            {a}
                          </button>
                        ))}
                      </div>
                    )}
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
          totalResults={customers.length}
          rangeStart={start + 1}
          rangeEnd={Math.min(start + perPage, customers.length)}
          onPageChange={setPage}
          onPerPageChange={(n) => {
            setPerPage(n);
            setPage(1);
          }}
        />
      </div>

      <AddClientModal variant={modal} onClose={() => setModal(null)} />
    </div>
  );
}
