import { notFound } from "next/navigation";
import { VerificationDetail } from "@/components/verification/VerificationDetail";
import { kycVerifications } from "@/lib/data/idv";
import {
  kycChecksSummary,
  kycDocumentFields,
} from "@/lib/data/verification-detail";

export default async function KycDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const verification = kycVerifications.find((v) => v.id === id);
  if (!verification) notFound();

  return (
    <VerificationDetail
      verification={verification}
      backHref="/kyc"
      fields={kycDocumentFields}
      checks={kycChecksSummary}
      showMrzColumns={false}
      showKycProfile
    />
  );
}
