import type { Metadata } from "next";
import { VerificationTable } from "@/components/verification/VerificationTable";
import { kycVerifications } from "@/lib/data/idv";

export const metadata: Metadata = { title: "KYC — Document KYC" };

export default function KycPage() {
  return (
    <VerificationTable rows={kycVerifications} basePath="/kyc" showChangeColumn />
  );
}
