import { createRng, intBetween, pick, pickWeighted } from "@/lib/seed";

export type VerificationStatus = "PASSED" | "REJECTED" | "WARNING" | "PENDING";
export type CheckState = "passed" | "failed" | "warning" | "idle";

export type Verification = {
  id: string;
  reference: string;
  name: string;
  documentType: "Identity Card" | "Passport" | "Driver License" | "---";
  country: string;
  source: string;
  status: VerificationStatus;
  checks: { label: string; state: CheckState }[];
  flagged: boolean;
  createdAt: string;
  retrievedAt: string;
};

const ARABIC_NAMES = [
  "احمد العبيد",
  "قصي حمودي البيد",
  "حسين علي حمودي الهيد ن",
  "حسني بحمودي الصيد",
  "طه undefined",
  "دانيال بلوطن",
  "وسيم بوضا خرو خرو",
  "زيد السميسم",
  "الحموري",
  "علاء الفهداوي",
  "سيف الدين ماجد اجياب الراشد",
  "سيف الدين الراشد",
  "رهام فواد عواد البياتي",
  "سرمد علي صالح الجبوري",
  "حد نيرمحمد القاس",
  "عمر بلوله",
  "نضال سليم حميد البراك",
  "علي جمال امين",
  "سلام اسماعيل خليل بحراني",
  "حسن حيدر عبدالمحسن الطال ب",
  "مصعب حيدر عبد المحسن اليصام",
];

const LATIN_NAMES = [
  "HATEM FIRAS HATEM ALNABULSI",
  "MOHAMMAD MUNEER MOHAMMAD ALQASEM",
  "ALHARETH AHMAD RADWAN ALJUNDI",
  "MANAL MOHAMMAD HASAN TOUBASI",
  "THOMAS WILLIAM COUGHLIN",
  "AHMED JARRAR",
  "ZOULFA KHALAF",
  "SAMER AZAR",
  "TAHA AJINA",
  "AFNAN ALBATATI",
  "MOHAMMAD HUSNI",
  "COUGHLIN THOMAS WILLIAM",
  "JOSEPH SHAWQI ALNAJJAR",
];

const COUNTRIES = ["IRQ", "JOR", "PSE", "SAU", "USA", "ISR"] as const;
const SOURCES = ["Web", "Android v2.17", "iOS v2.11"] as const;

const CHECK_LABELS = ["DOC", "NFC", "LIV", "FM", "AML"];

function buildChecks(
  rng: () => number,
  status: VerificationStatus,
  isPassport: boolean,
) {
  // Passports scanned from a photo often only run the document check.
  const docOnly = isPassport && rng() < 0.45;
  const labels = docOnly
    ? ["DOC"]
    : CHECK_LABELS.filter((l) => (l === "NFC" ? rng() < 0.4 : true));

  return labels.map((label) => {
    if (status === "PENDING") return { label, state: "idle" as CheckState };
    if (status === "PASSED") return { label, state: "passed" as CheckState };
    if (status === "WARNING")
      return {
        label,
        state: pickWeighted(rng, [
          ["passed", 3],
          ["warning", 2],
        ]) as CheckState,
      };
    return {
      label,
      state: pickWeighted(rng, [
        ["passed", 3],
        ["failed", 2],
      ]) as CheckState,
    };
  });
}

function hexId(rng: () => number, length: number) {
  const chars = "0123456789abcdef";
  let out = "";
  for (let i = 0; i < length; i++) out += chars[Math.floor(rng() * 16)];
  return out;
}

function buildVerifications(
  count: number,
  seed: number,
  opts: { statusWeights?: (readonly [VerificationStatus, number])[] } = {},
): Verification[] {
  const rng = createRng(seed);
  const rows: Verification[] = [];

  // Walk backwards in time from a fixed "now" so the list reads newest-first.
  let cursor = Date.UTC(2026, 6, 10, 18, 45);

  const statusWeights =
    opts.statusWeights ??
    ([
      ["REJECTED", 38],
      ["PASSED", 29],
      ["WARNING", 17],
      ["PENDING", 16],
    ] as const);

  for (let i = 0; i < count; i++) {
    const status = pickWeighted(rng, statusWeights);
    const blank = rng() < 0.06;
    const isPassport = rng() < 0.3;

    const documentType: Verification["documentType"] = blank
      ? "---"
      : isPassport
        ? "Passport"
        : "Identity Card";

    const name = blank
      ? "---"
      : rng() < 0.65
        ? pick(rng, ARABIC_NAMES)
        : pick(rng, LATIN_NAMES);

    const createdAt = new Date(cursor).toISOString();
    cursor -= intBetween(rng, 12, 260) * 60 * 1000;

    rows.push({
      id: `${hexId(rng, 6)}-${hexId(rng, 4)}-${hexId(rng, 4)}-${hexId(rng, 12)}`,
      reference: hexId(rng, 8).toUpperCase(),
      name,
      documentType,
      country: blank ? "---" : pick(rng, COUNTRIES),
      source: pick(rng, SOURCES),
      status,
      checks: buildChecks(rng, status, isPassport),
      flagged: rng() < 0.18,
      createdAt,
      retrievedAt: new Date(cursor + 3600_000).toISOString(),
    });
  }

  return rows;
}

/** IDV inbox — the screenshot reports 3,219 results across 129 pages. */
export const idvVerifications = buildVerifications(3219, 20260710);

/** KYC is a smaller, web-only funnel (23 results in the screenshot). */
export const kycVerifications = buildVerifications(23, 77021, {
  statusWeights: [
    ["REJECTED", 35],
    ["WARNING", 30],
    ["PASSED", 26],
    ["PENDING", 9],
  ],
}).map((row) => ({ ...row, source: "Web" }));

export function findVerification(id: string) {
  return (
    idvVerifications.find((v) => v.id === id) ??
    kycVerifications.find((v) => v.id === id)
  );
}
