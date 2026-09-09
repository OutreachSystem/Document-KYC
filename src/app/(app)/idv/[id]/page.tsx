import { notFound } from "next/navigation";
import { VerificationDetail } from "@/components/verification/VerificationDetail";
import { idvVerifications } from "@/lib/data/idv";
import {
  checksSummary,
  idvDocumentFields,
} from "@/lib/data/verification-detail";

export default async function IdvDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const verification = idvVerifications.find((v) => v.id === id);
  if (!verification) notFound();

  return (
    <VerificationDetail
      verification={verification}
      backHref="/idv"
      fields={idvDocumentFields}
      checks={checksSummary}
    />
  );
}
