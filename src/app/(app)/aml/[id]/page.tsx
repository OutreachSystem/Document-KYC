import { notFound } from "next/navigation";
import { AmlCaseView } from "./AmlCaseView";
import { amlTransactions } from "@/lib/data/aml";

export default async function AmlCasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tx = amlTransactions.find((t) => t.id === id);
  if (!tx) notFound();

  return <AmlCaseView entity={tx.entity} results={tx.results} />;
}
