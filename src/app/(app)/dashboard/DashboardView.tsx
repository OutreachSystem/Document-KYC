"use client";

import { useState } from "react";
import { ChevronDown, FileText, Sheet } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ComposedChart,
} from "recharts";
import { Card, ChartCard } from "@/components/ui/Card";
import { ChartLegend } from "@/components/charts/ChartLegend";
import { Flag } from "@/components/ui/Flag";
import {
  applicationSources,
  countryBreakdown,
  dailySeries,
  kpis,
  productTabs,
  statusBreakdown,
} from "@/lib/data/dashboard";

const COLORS = {
  passed: "#5ecfb1",
  rejected: "#d92662",
  warning: "#e0b13c",
  pending: "#9ca3af",
};

const axisProps = {
  tick: { fontSize: 10, fill: "#9ca3af" },
  axisLine: { stroke: "#e5e7eb" },
  tickLine: false,
} as const;

function tooltipStyle() {
  return {
    contentStyle: {
      borderRadius: 10,
      border: "1px solid #e5e7eb",
      fontSize: 11,
      boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    },
  };
}

export function DashboardView() {
  const [activeTab, setActiveTab] = useState<string>("idv");

  return (
    <div className="p-5">
      {/* Header: product switcher + export actions */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          {productTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-4 py-1.5 text-[11px] font-bold ring-1 transition ${
                activeTab === tab.id
                  ? tab.active
                  : "bg-white text-gray-500 ring-gray-200 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs text-gray-700 shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-50">
            This Month <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs text-gray-700 shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-50">
            <FileText className="h-3.5 w-3.5 text-gray-400" /> PDF
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs text-gray-700 shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-50">
            <Sheet className="h-3.5 w-3.5 text-gray-400" /> CSV
          </button>
        </div>
      </div>

      {/* KPI strip */}
      <div className="mb-5 grid grid-cols-2 gap-4 md:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="px-5 py-4">
            <p className="text-[11px] text-gray-500">{kpi.label}</p>
            <p className="mt-1 flex items-baseline gap-1.5">
              <span className={`text-2xl font-bold ${kpi.tone}`}>{kpi.value}</span>
              <span className="text-[10px] text-gray-400">{kpi.suffix}</span>
            </p>
          </Card>
        ))}
      </div>

      {/* Row 1 */}
      <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        <ChartCard
          title="Verification statuses breakdown"
          subtitle="Share of outcomes for selected period"
        >
          <ChartLegend
            items={[
              { label: "Passed", color: COLORS.passed },
              { label: "Rejected", color: COLORS.rejected },
              { label: "Warning", color: COLORS.warning },
              { label: "Pending", color: COLORS.pending },
            ]}
          />
          <div className="mt-4 h-[210px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusBreakdown} barSize={38}>
                <CartesianGrid vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" {...axisProps} />
                <YAxis {...axisProps} domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} />
                <Tooltip cursor={{ fill: "#f9fafb" }} {...tooltipStyle()} />
                <Bar dataKey="value" radius={[2, 2, 0, 0]} isAnimationActive={false}>
                  {statusBreakdown.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Country & Document Breakdown"
          subtitle="Top countries and used ID types"
        >
          <table className="w-full text-[11px]">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wide text-gray-400">
                <th className="pb-2 font-medium">Country</th>
                <th className="pb-2 font-medium">All</th>
                <th className="pb-2 font-medium">Passport</th>
                <th className="pb-2 font-medium">ID card</th>
                <th className="pb-2 font-medium">DL</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {countryBreakdown.map((row) => (
                <tr key={row.country} className="border-t border-gray-50">
                  <td className="py-2">
                    <span className="flex items-center gap-2 font-semibold">
                      <Flag code={row.country} />
                      {row.country}
                    </span>
                  </td>
                  <td className="py-2">{row.all}</td>
                  <td className="py-2">{row.passport}</td>
                  <td className="py-2">{row.idCard}</td>
                  <td className="py-2">{row.dl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ChartCard>

        <ChartCard
          title="Application sources"
          subtitle="Web, iOS, and Android share and dynamics"
        >
          <div className="h-[190px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={applicationSources}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={0}
                  outerRadius={80}
                  startAngle={90}
                  endAngle={-270}
                  stroke="#fff"
                  strokeWidth={2}
                 isAnimationActive={false}>
                  {applicationSources.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle()} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex justify-center">
            <ChartLegend
              items={applicationSources.map((s) => ({
                label: s.name,
                color: s.fill,
              }))}
            />
          </div>
        </ChartCard>
      </div>

      {/* Row 2 */}
      <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        <ChartCard
          title="Verifications results"
          subtitle="Daily processing workload with statuses"
        >
          <ChartLegend
            items={[
              { label: "Passed", color: COLORS.passed },
              { label: "Rejected", color: COLORS.rejected },
              { label: "Warning", color: COLORS.warning },
              { label: "Pending", color: COLORS.pending },
            ]}
          />
          <div className="mt-4 h-[190px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailySeries} stackOffset="none">
                <CartesianGrid vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="label" {...axisProps} angle={-40} textAnchor="end" height={48} interval={1} />
                <YAxis {...axisProps} />
                <Tooltip {...tooltipStyle()} />
                <Area type="monotone" dataKey="pending" stackId="1" stroke={COLORS.pending} fill={COLORS.pending} fillOpacity={0.45}  isAnimationActive={false}/>
                <Area type="monotone" dataKey="warning" stackId="1" stroke={COLORS.warning} fill={COLORS.warning} fillOpacity={0.45}  isAnimationActive={false}/>
                <Area type="monotone" dataKey="rejected" stackId="1" stroke={COLORS.rejected} fill={COLORS.rejected} fillOpacity={0.35}  isAnimationActive={false}/>
                <Area type="monotone" dataKey="passed" stackId="1" stroke={COLORS.passed} fill={COLORS.passed} fillOpacity={0.4}  isAnimationActive={false}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Passed Verifications"
          subtitle="Daily passed verification trends"
        >
          <div className="h-[210px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailySeries}>
                <CartesianGrid vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="label" {...axisProps} angle={-40} textAnchor="end" height={48} interval={1} />
                <YAxis {...axisProps} />
                <Tooltip {...tooltipStyle()} />
                <Area
                  type="monotone"
                  dataKey="passed"
                  stroke={COLORS.passed}
                  strokeWidth={2}
                  fill={COLORS.passed}
                  fillOpacity={0.12}
                 isAnimationActive={false}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Rejected Verifications"
          subtitle="Daily rejected verification trends"
        >
          <div className="h-[210px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={dailySeries}>
                <CartesianGrid vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="label" {...axisProps} angle={-40} textAnchor="end" height={48} interval={1} />
                <YAxis {...axisProps} />
                <Tooltip cursor={{ fill: "#fdf2f6" }} {...tooltipStyle()} />
                <Bar dataKey="rejected" fill="#e8558a" radius={[2, 2, 0, 0]} barSize={14}  isAnimationActive={false}/>
                <Line
                  type="monotone"
                  dataKey="rejected"
                  stroke={COLORS.rejected}
                  strokeWidth={2}
                  dot={false}
                 isAnimationActive={false}/>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ChartCard
          title="Pending Verifications"
          subtitle="Daily pending verification trends"
        >
          <div className="h-[210px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailySeries}>
                <CartesianGrid vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="label" {...axisProps} angle={-40} textAnchor="end" height={48} />
                <YAxis {...axisProps} />
                <Tooltip {...tooltipStyle()} />
                <Area
                  type="monotone"
                  dataKey="pending"
                  stroke="#4b5563"
                  strokeWidth={2}
                  fill="#9ca3af"
                  fillOpacity={0.18}
                 isAnimationActive={false}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Warning Verifications"
          subtitle="Daily warning verification trends"
        >
          <div className="h-[210px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailySeries}>
                <CartesianGrid vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="label" {...axisProps} angle={-40} textAnchor="end" height={48} />
                <YAxis {...axisProps} />
                <Tooltip cursor={{ fill: "#fefce8" }} {...tooltipStyle()} />
                <Bar dataKey="warning" fill="#facc15" radius={[2, 2, 0, 0]} barSize={22}  isAnimationActive={false}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
