import { notFound } from "next/navigation";
import { ExtractView } from "./ExtractView";
import { documentRecords } from "@/lib/data/idp";

export default async function IdpDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doc = documentRecords.find((d) => d.id === id);
  if (!doc) notFound();

  return <ExtractView fileName={doc.fileName} fileType={doc.type} />;
}
