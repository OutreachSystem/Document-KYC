import { createRng, intBetween, pick } from "@/lib/seed";

export type DocumentRecord = {
  id: string;
  fileName: string;
  type: "Image" | "PDF";
  owner: string;
  createdAt: string;
  status: "Complete" | "Processing" | "Failed";
  agents: string[];
};

export type TemplateRecord = {
  id: string;
  fileName: string;
  type: "Image" | "PDF";
  owner: string;
  confidence: number;
  createdAt: string;
};

const FILE_NAMES: [string, "Image" | "PDF"][] = [
  ["idcardfront 3 (1).jpeg", "Image"],
  ["image (31).png", "Image"],
  ["Artboard 3-2.jpg", "Image"],
  ["Artboard 3.jpg", "Image"],
  ["CV_4_Minimalist_Creative.pdf", "PDF"],
  ["CV_3_Two_Column_Professional.pdf", "PDF"],
  ["CV_2_Modern_Skills_Based.pdf", "PDF"],
  ["CV_1_Classic_Chronological.pdf", "PDF"],
  ["WhatsApp Image 2023-03-23 at 15.21.33.jpg", "Image"],
  ["شهادة_تسجيل_جديد_في_عربية_المصافه_09-01-2025_120208.988001.pdf", "PDF"],
  ["image (27).png", "Image"],
  ["شركة أعمال هميف للمقاولات - شهادة تسجيل فرع شركة - Copy (2).pdf", "PDF"],
  ["KSA Passport - Copy (3).png", "Image"],
  ["image (26).png", "Image"],
  ["Holiday Taxis Scope (1) (1) 1 (1).pdf", "PDF"],
  ["idcardfront 3.jpeg", "Image"],
  ["Business License 2022 edit.jpg", "Image"],
  ["Bank_Statement_Q3.pdf", "PDF"],
  ["Utility_Bill_March.png", "Image"],
  ["Commercial_Register_2024.pdf", "PDF"],
];

const AGENT_SETS = [
  ["OCR", "Veritas Engine"],
  ["OCR", "Veritas Engine"],
  ["OCR"],
  ["OCR", "Veritas Engine", "Lingua Trace"],
  ["OCR", "MedSense"],
  ["OCR", "Veritas Engine", "Financials"],
];

function buildDocuments(count: number, seed: number): DocumentRecord[] {
  const rng = createRng(seed);
  const rows: DocumentRecord[] = [];
  let cursor = Date.UTC(2026, 6, 3, 16, 5);

  for (let i = 0; i < count; i++) {
    const [fileName, type] = pick(rng, FILE_NAMES);
    const createdAt = new Date(cursor).toISOString();
    cursor -= intBetween(rng, 40, 2600) * 60 * 1000;

    rows.push({
      id: `doc-${String(i + 1).padStart(4, "0")}`,
      fileName,
      type,
      owner: "yazan123@gmail.com",
      createdAt,
      status: "Complete",
      agents: pick(rng, AGENT_SETS),
    });
  }
  return rows;
}

/** Nexus Layout scan history — 193 results in the reference screenshot. */
export const documentRecords = buildDocuments(193, 5150);

export const templateRecords: TemplateRecord[] = [
  {
    id: "tpl-0001",
    fileName: "Business License 2022 edit.jpg",
    type: "Image",
    owner: "yazan123@gmail.com",
    confidence: 18,
    createdAt: "2026-05-07T15:34:00.000Z",
  },
];

export const aiAgents = [
  { name: "Lingua Trace", active: false },
  { name: "MedSense", active: false },
  { name: "Financials", active: false },
  { name: "Veritas Engine", active: true },
  { name: "Detect Tables", active: false },
  { name: "Redact PII", active: false },
];

export const extractParagraphs = {
  arabic: [
    "المملكة الأردنية الهاشمية وزارة الداخلية - دائرة الأحوال المدنية والجوازات - بطاقة شخصية",
    "الاسم: محمد منير محمد القاسم",
    "الرقم الوطني: 9871018201 ر",
    "تاريخ الولادة: 28/12/1987 مكان الولادة: عمان",
    "Name: MOHAMMAD MUNEER MOHAMMAD ALQASEM",
  ],
  english: [
    "The Hashemite Kingdom of Jordan Ministry of Interior - Civil Status & Passport Dept. ID Card",
    "1987",
    "الجنس / M",
    "اسم الام: احلام",
  ],
};

export const templateExtractFields = {
  docType: "KSA-Building-permit",
  confidence: "17.90%",
  rows: [
    { form: "License number", visual: "٥٠٫٠٠" },
    { form: "License status", visual: "فعالة" },
    { form: "Expiry date", visual: "٢٠٣٢/٦/٢" },
    { form: "Request type", visual: "الرخصة بموجب قانون المهن لمدينة ونظام ترخيص" },
    { form: "Major Municipality", visual: "المملكة الأردنية الهاشمية" },
    { form: "Municipality", visual: "دائرة رخص المهن والإعلانات" },
    { form: "District", visual: "طابق ة" },
    { form: "License holder's name", visual: "محمد غالب سليمان استيتيه وشركاه" },
    { form: "Type of ownership document", visual: "شركة" },
    { form: "Construction type", visual: "تجاري" },
    { form: "Ownership document number", visual: "٣٤٨١٢" },
    { form: "Identity type", visual: "عثمان أمانة عمان الكبرى" },
    { form: "Date of ownership document", visual: "٢٠٦١٦٣٢٧١٦" },
    { form: "Scheme number", visual: "٦٠٠" },
    { form: "Basin number", visual: "١٢" },
    { form: "Plot number", visual: "٣٣٦" },
    { form: "Total revenue", visual: "١١٥٫٥٠" },
  ],
};
