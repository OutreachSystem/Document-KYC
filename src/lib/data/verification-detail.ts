export type FieldRow = {
  field: string;
  mrz?: string;
  visual?: string;
  nfc?: string;
  match?: boolean;
};

export type CheckSummaryItem = {
  label: string;
  result: "PASSED" | "FAILED" | "WARNING";
  description: string;
};

export type MediaItem = { label: string; kind: "face" | "doc" | "ghost" };

export const checksSummary: CheckSummaryItem[] = [
  {
    label: "ID Document Check",
    result: "PASSED",
    description: "Short description of automated rules, thresholds, and signals.",
  },
  {
    label: "Liveness Check",
    result: "PASSED",
    description: "Short description of automated rules, thresholds, and signals.",
  },
  {
    label: "Facial Similarity",
    result: "FAILED",
    description: "Short description of automated rules, thresholds, and signals.",
  },
  {
    label: "AML Watchlist",
    result: "PASSED",
    description: "Short description of automated rules, thresholds, and signals.",
  },
];

export const kycChecksSummary: CheckSummaryItem[] = [
  {
    label: "ID Document Check",
    result: "PASSED",
    description: "Short description of automated rules, thresholds, and signals.",
  },
  {
    label: "Liveness Check",
    result: "WARNING",
    description: "Short description of automated rules, thresholds, and signals.",
  },
  {
    label: "Facial Similarity",
    result: "PASSED",
    description: "Short description of automated rules, thresholds, and signals.",
  },
  {
    label: "AML Watchlist",
    result: "PASSED",
    description: "Short description of automated rules, thresholds, and signals.",
  },
];

export const mediaItems: MediaItem[] = [
  { label: "selfie", kind: "face" },
  { label: "liveness_1", kind: "face" },
  { label: "liveness_2", kind: "face" },
  { label: "liveness_3", kind: "face" },
  { label: "liveness_4", kind: "face" },
  { label: "Front", kind: "doc" },
  { label: "back", kind: "doc" },
  { label: "Portrait", kind: "face" },
  { label: "Ghost portrait", kind: "ghost" },
  { label: "Document Frontside Raw", kind: "doc" },
];

export const idvDocumentFields: FieldRow[] = [
  {
    field: "MRZ Strings",
    mrz: "IDIRQE1794071\n8H21982354233\n153<<<\n9201084M3406\n0168RQ<<<<<<\n<<2\nALEBYD<<AHM\nAD<<<<<<<<<\n<<<<<<<<",
    nfc: "IDIRQE17940768\n2198225023153<\n<<\n9201084M340803\nRQ<<<<<<<\n<<2\nALEBYD<<AHMAD\nD<<<<<<<<<<<<",
    match: true,
  },
  { field: "Document Class Code", mrz: "ID", nfc: "ID", match: true },
  { field: "Issuing State Code", mrz: "IRQ", visual: "IRQ", nfc: "IRQ", match: true },
  {
    field: "Document Number",
    mrz: "E17940786",
    visual: "E17940768",
    nfc: "E17940786",
    match: true,
  },
  { field: "Document Number Checkdigit", mrz: "2", nfc: "2", match: true },
  {
    field: "Personal Number",
    mrz: "198225023153",
    visual: "198225023153",
    nfc: "198225023153",
    match: true,
  },
  { field: "Optional Data", mrz: "198225023153", nfc: "198225023153" },
  {
    field: "Date of Birth",
    mrz: "08-01-1992",
    visual: "08-01-1992",
    nfc: "08-01-1992",
    match: true,
  },
  { field: "Date of Birth Checkdigit", mrz: "4", nfc: "4", match: true },
  { field: "Sex", mrz: "M", visual: "M", nfc: "M", match: true },
  {
    field: "Date of Expiry",
    mrz: "01-06-2034",
    visual: "01-06-2034",
    nfc: "01-06-2034",
    match: true,
  },
  { field: "Date of Expiry Checkdigit", mrz: "6", nfc: "8", match: true },
  { field: "Nationality Code", mrz: "IRQ", nfc: "IRQ", match: true },
  { field: "Final Checkdigit", mrz: "2", nfc: "2", match: true },
  {
    field: "Surname And Given Names",
    mrz: "ALEBYD AXHMD",
    visual: "ALEBYD AHMD",
    nfc: "ALEBYD AXHMDALEBYD AXHMD",
    match: true,
  },
  { field: "RemainderTerm", mrz: "94", visual: "94", nfc: "94", match: true },
  { field: "Surname", mrz: "ALEBYD", visual: "ALEBYD", nfc: "ALEBYD", match: true },
  { field: "Given Names", mrz: "AXHMD", visual: "AHMD", nfc: "AHMD", match: true },
  { field: "Date of Issue", visual: "02-06-2024", nfc: "02-06-2024", match: true },
  { field: "Issuing State Name", mrz: "Iraq", visual: "Iraq", nfc: "Iraq", match: true },
  { field: "Nationality", mrz: "Iraq", visual: "Iraq", nfc: "Iraq", match: true },
  { field: "DS Certificate Valid To", nfc: "08-07-2034" },
  { field: "Years Since Issue", visual: "2", nfc: "2", match: true },
  { field: "Age at Issue", visual: "32", nfc: "32", match: true },
  { field: "Age", mrz: "34", visual: "34", nfc: "34", match: true },
  { field: "Sex", visual: "ذكر" },
  { field: "Blood Group", visual: "O+" },
  { field: "Mothers Name", visual: "ليان", nfc: "ليان" },
  { field: "Card Access Number", visual: "410928" },
  { field: "Grandfather Name", visual: "حمودي", nfc: "حمودي" },
  { field: "Grandfather Names (maternal)", visual: "جواد", nfc: "جواد" },
  { field: "Identity Card Number", nfc: "10010M231800 05081" },
  {
    field: "Authority",
    visual: "مديرية الجنسية والجوازات والمعلومات المدنية",
    nfc: "مديرية الجنسية والجوازات والمعلومات المدنية",
  },
  { field: "Place of Birth", visual: "منصور كرخ بغداد", nfc: "منصور كرخ بغداد" },
  { field: "Fathers Name", visual: "MHMD" },
  { field: "Mothers Name", visual: "AYMAN" },
  {
    field: "Authority",
    nfc: "MDYRYTA ALJNSYTA WALMELWMAT ALMDNYTA",
  },
  { field: "Place of Birth", nfc: "MNSSWRKRX-KRD-BGDAD" },
  { field: "Fathers Name", visual: "محمد", nfc: "محمد" },
  { field: "Given Names", visual: "احمد", nfc: "احمد" },
  { field: "Surname", visual: "العبيد", nfc: "العبيد" },
  { field: "DS Certificate Valid From", nfc: "12-04-2024" },
  { field: "DS Certificate Issuer", nfc: "IRQ" },
  { field: "MRZ Type", mrz: "ID-1", nfc: "ID-1" },
  { field: "Surname And Given Names", visual: "العبيد احمد", nfc: "العبيد احمد" },
];

export const kycDocumentFields: FieldRow[] = [
  {
    field: "Surname And Given Names",
    mrz: "ALBYATY RHAM",
    visual: "ALBYATY RHAM",
  },
  { field: "Surname And Given Names", visual: "البياتي رهام" },
  { field: "Surname", mrz: "ALBYATY", visual: "ALBYATY" },
  { field: "Surname", visual: "البياتي" },
  { field: "Given Names", mrz: "RHAM", visual: "RHAM" },
  { field: "Given Names", visual: "رهام" },
  { field: "Date of Birth", mrz: "1994-11-02", visual: "1994-11-02", match: true },
  {
    field: "Document Number",
    mrz: "AZ8989229",
    visual: "AZ8989229",
    match: true,
  },
  { field: "Issuing State Name", mrz: "Iraq", visual: "Iraq", match: true },
  {
    field: "Date of Expiry",
    mrz: "2031-10-30",
    visual: "2031-10-30",
    match: true,
  },
  { field: "Date of Issue", visual: "2021-10-31" },
  { field: "RemainderTerm", mrz: "63", visual: "63", match: true },
  { field: "Sex", mrz: "F", visual: "F" },
  { field: "Sex", visual: "انثى" },
  { field: "Age", mrz: "31", visual: "31", match: true },
  { field: "Nationality", visual: "Iraq" },
  { field: "Document Class Code", mrz: "ID" },
  { field: "Issuing State Code", mrz: "IRQ", visual: "IRQ", match: true },
  {
    field: "Authority",
    visual: "MDYRYTA AL JNSYTA WALMELWMAT ALMDNYTA",
  },
  { field: "Authority", visual: "مديرية الجنسية والمعلومات المدنية" },
  { field: "Document Number Checkdigit", mrz: "8" },
  { field: "Age at Issue", visual: "26" },
  { field: "Date of Expiry Checkdigit", mrz: "4" },
  { field: "Nationality Code", mrz: "IRQ" },
  { field: "Final Checkdigit", mrz: "9" },
  {
    field: "MRZ Strings",
    mrz: "IDIRQAZ89892298\n01994\n27003042<<<<\n9411025F31103\n048IRQ<\n<<<<<<<<<<9\nALBYATY<<RHAM\n<<<<<<<<<<<<<<",
  },
  { field: "Date of Birth Checkdigit", mrz: "5" },
  { field: "Personal Number", mrz: "199427003042", match: true },
  { field: "Identity Card Number", visual: "1001100M4930003204" },
  { field: "MRZ Type", mrz: "ID-1" },
  { field: "Years Since Issue", visual: "4" },
  { field: "Place of Birth", visual: "الكرخ-بغداد" },
  { field: "Mothers Name", visual: "ZHRH" },
  { field: "Fathers Name", visual: "FWAD" },
  { field: "Blood Group", visual: "A+" },
  { field: "Place of Birth", visual: "ALKRKH-BGDAD" },
  { field: "Grandfather Name", visual: "غوار" },
  { field: "Grandfather Name (maternal)", visual: "غلام" },
  { field: "Card Access Number", visual: "952896" },
  { field: "Mothers Name", visual: "زهره" },
  { field: "Fathers Name", visual: "فواد" },
  { field: "Optional Data", visual: "199427003042" },
];

export const kycPersonalProfile = {
  residence: [
    { label: "COUNTRY", value: "العراق" },
    { label: "CITY", value: "بغداد" },
    { label: "AREA", value: "660/8536" },
    { label: "STREET NAME", value: "مجمع بوابة العراق" },
    { label: "DISTRICT", value: "203" },
    { label: "BUILDING NUMBER", value: "—" },
    { label: "EMAIL", value: "rehamalbayati42@gmil.com" },
    { label: "COUNTRY CODE", value: "+964" },
    { label: "MOBILE", value: "7732040480" },
    { label: "LANDLINE NUMBER", value: "العراق | +964 ▾" },
    { label: "P.O.BOX", value: "—" },
    { label: "ZIP CODE", value: "—" },
    { label: "OTHER NATIONALITY", value: "—" },
    { label: "MARITAL STATUS", value: "أعزب" },
    { label: "HUSBAND/WIFE NAME", value: "—" },
    { label: "EDUCATION", value: "ماجستير" },
    {
      label: "PROOF OF ADDRESS",
      value: "بطاقة سكني رهام فؤاد",
    },
    { label: "UPLOAD DOCUMENT", value: "بطاقة سكني رهام فؤاد" },
    { label: "PASSPORT", value: "جواز ٢٠٢٢-١١-٢٠" },
  ],
  sections: [
    "Employment Details",
    "Trading Experience",
    "FATCA & PEP Declaration",
  ],
};
