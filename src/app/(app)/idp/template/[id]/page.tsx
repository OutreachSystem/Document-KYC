import { notFound } from "next/navigation";
import { TemplateExtractView } from "./TemplateExtractView";
import { templateRecords } from "@/lib/data/idp";

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tpl = templateRecords.find((t) => t.id === id);
  if (!tpl) notFound();

  return <TemplateExtractView fileName={tpl.fileName} />;
}
