import type { Metadata } from "next";
import { VerificationTable } from "@/components/verification/VerificationTable";
import { idvVerifications } from "@/lib/data/idv";

export const metadata: Metadata = { title: "IDV — Document KYC" };

export default function IdvPage() {
  return <VerificationTable rows={idvVerifications} basePath="/idv" />;
}
