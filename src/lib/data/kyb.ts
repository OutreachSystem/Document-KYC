export type KybCase = {
  id: string;
  company: string;
  country: string;
  risk: "LOW" | "MEDIUM" | "HIGH";
  status:
    | "Pending Review"
    | "Complete - Approved"
    | "Rejected - Manual Freeze";
  submittedAt: string;
  archived: boolean;
};

export const kybStats = [
  { label: "Total Cases", value: 4, icon: "folder" as const },
  { label: "Pending Review", value: 2, icon: "clock" as const },
  { label: "Approved Last 7D", value: 5, icon: "check" as const },
  { label: "High Risk", value: 1, icon: "alert" as const },
];

export const kybCases: KybCase[] = [
  {
    id: "KYB-001",
    company: "Al-Ahlia Trading Est.",
    country: "KSA",
    risk: "MEDIUM",
    status: "Pending Review",
    submittedAt: "2025-11-09",
    archived: false,
  },
  {
    id: "KYB-002",
    company: "Emirates Tech Solutions LLC",
    country: "UAE",
    risk: "LOW",
    status: "Complete - Approved",
    submittedAt: "2025-11-07",
    archived: true,
  },
  {
    id: "KYB-003",
    company: "Baghdad Investment Group",
    country: "IRQ",
    risk: "HIGH",
    status: "Rejected - Manual Freeze",
    submittedAt: "2025-11-09",
    archived: true,
  },
  {
    id: "KYB-004",
    company: "Petra Logistics Ltd.",
    country: "JOR",
    risk: "MEDIUM",
    status: "Pending Review",
    submittedAt: "2025-11-10",
    archived: false,
  },
];
