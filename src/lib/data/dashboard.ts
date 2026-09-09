import { createRng, intBetween } from "@/lib/seed";

export type DailyPoint = {
  date: string;
  label: string;
  passed: number;
  rejected: number;
  warning: number;
  pending: number;
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

function buildSeries(): DailyPoint[] {
  const rng = createRng(884422);
  const points: DailyPoint[] = [];

  for (let day = 1; day <= 10; day++) {
    const date = `2026-07-${String(day).padStart(2, "0")}`;
    points.push({
      date,
      label: `${String(day).padStart(2, "0")} ${MONTHS[6]}`,
      passed: intBetween(rng, 3, 15),
      rejected: intBetween(rng, 0, 16),
      warning: intBetween(rng, 0, 9),
      pending: intBetween(rng, 0, 14),
    });
  }

  // Anchor a few days to match the shapes in the reference dashboard.
  points[0].pending = 13;
  points[1].pending = 6;
  points[4].passed = 15;
  points[9].rejected = 11;
  return points;
}

export const dailySeries = buildSeries();

export const kpis = [
  { label: "Verifications", value: "216", suffix: "count", tone: "text-gray-900" },
  { label: "Passed", value: "29%", suffix: "of total", tone: "text-emerald-600" },
  { label: "Rejected", value: "38%", suffix: "of total", tone: "text-rose-600" },
  { label: "Pending", value: "16%", suffix: "of total", tone: "text-gray-500" },
];

export const statusBreakdown = [
  { name: "Passed", value: 62, fill: "#5ecfb1" },
  { name: "Rejected", value: 82, fill: "#d92662" },
  { name: "Warning", value: 34, fill: "#c98416" },
  { name: "Pending", value: 34, fill: "#8f8f8f" },
];

export const countryBreakdown = [
  { country: "JOR", all: 111, passport: 2, idCard: 107, dl: 0 },
  { country: "IRQ", all: 51, passport: 23, idCard: 28, dl: 0 },
  { country: "PSE", all: 36, passport: 0, idCard: 36, dl: 0 },
  { country: "SAU", all: 1, passport: 1, idCard: 0, dl: 0 },
  { country: "USA", all: 1, passport: 1, idCard: 0, dl: 0 },
];

export const applicationSources = [
  { name: "Web", value: 74, fill: "#b39ae0" },
  { name: "iOS", value: 2, fill: "#3f3f46" },
  { name: "AOS", value: 24, fill: "#3fbf6f" },
];

export const productTabs = [
  { id: "idv", label: "Identity Verification", active: "bg-sky-100 text-sky-800 ring-sky-300" },
  { id: "doc", label: "DOC INTEGELLIGENCE", active: "bg-emerald-100 text-emerald-800 ring-emerald-300" },
  { id: "aml", label: "Anti Money Laundering", active: "bg-rose-100 text-rose-800 ring-rose-300" },
] as const;
