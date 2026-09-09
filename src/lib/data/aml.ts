import { createRng, intBetween, pick, pickWeighted } from "@/lib/seed";

export type AmlResult = "No_match" | "Potential_match" | "False_positive";
export type AmlRisk = "Unknown" | "Low" | "Medium" | "High";

export type AmlTransaction = {
  id: string;
  entity: string;
  fuzziness: string;
  results: number;
  status: AmlResult;
  risk: AmlRisk;
  monitored: boolean;
  createdAt: string;
};

export type AmlCandidate = {
  name: string;
  relevance: string;
  countries: string;
  tags: string[];
};

const ENTITIES = [
  "AHMAD ALEBYD",
  "ALNABULSI HATEM FIRAS HATEM",
  "MOHAMMAD MUNEER MOHAMMAD ALQASEM",
  "COUGHLIN THOMAS WILLIAM",
  "BUATTIN DAKIYIL",
  "TOUBASI MANAL MOHAMMAD HASAN",
  "ZYD الحسيني",
  "ALHWANY",
  "KT AHMD AHMD",
  "ALPHONSHY ELASR",
  "JOSEPH SHAWQAN SULEIMAN QAKHAMFEH",
  "SHEENANEAH KHALED ABDUL KAREEM",
  "AHMAD ALIB JOUDEH",
  "MOHAMMAD JAMIL ABDELQADER ALADALEH",
  "LYD-HL",
  "Ahmad Mohammad Ali Alkhaen",
  "ELLIBOUS SULEIMAN IBRAHIM NIDHA",
  "ALAGA MHMD",
  "Mohammad Ahmad Abdelrahim Sabri",
  "Jamil Abdallah Aoprid Ghabaqen",
  "EWQZ HWD",
  "IBRAHIM MOTAQEEN AHMAD ALI",
  "DYIRYH KHATY",
  "MHMD",
  "John Doe",
  "ALAA R H AL TUHL",
  "ALZAGHAL MAJD AHSAM MOHAMMAD",
  "DARWAZEH NISREEN HATEM FATHAL",
  "ALZAGHAL AKRAM MOHAMMAD SALEH",
  "ZYD ALIMYSM",
];

function buildTransactions(count: number, seed: number): AmlTransaction[] {
  const rng = createRng(seed);
  const rows: AmlTransaction[] = [];
  let cursor = Date.UTC(2026, 6, 10, 12, 44);

  for (let i = 0; i < count; i++) {
    const status = pickWeighted<AmlResult>(rng, [
      ["No_match", 45],
      ["Potential_match", 40],
      ["False_positive", 15],
    ]);

    const fuzziness = pick(rng, ["30%", "100%", "100% Exact Match", "-"]);
    const results =
      status === "No_match"
        ? 0
        : pick(rng, [1, 5, 8, 12, 19, 22, 28, 367, 10800]);

    const createdAt = new Date(cursor).toISOString();
    cursor -= intBetween(rng, 4, 260) * 60 * 1000;

    rows.push({
      id: `aml-${String(i + 1).padStart(5, "0")}`,
      entity: pick(rng, ENTITIES),
      fuzziness,
      results,
      status,
      risk: "Unknown",
      monitored: rng() < 0.85,
      createdAt,
    });
  }

  return rows;
}

/** 43,157 results in the reference screenshot; 875 pages at 50/page. */
export const amlTransactions = buildTransactions(2400, 31337);
export const amlTotalResults = 43157;

export const amlCase = {
  name: "ALNABULSI HATEM FIRAS HATEM",
  assignedTo: "Yalqasem",
  riskLevel: "Unknown",
  matchStatus: "Potential Match",
  monitored: true,
  candidates: [
    {
      name: "A. H. Firas",
      relevance: "unknown",
      countries: "Israel",
      tags: ["adverse-media", "adverse-media-v2-terrorism"],
    },
  ] as AmlCandidate[],
};

export const fuzzinessOptions = [
  "100% Exact Match",
  "90% Close Match",
  "70% Broad Match",
  "30% Wide Match",
];
