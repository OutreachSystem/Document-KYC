import { FileText } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const metadata = { title: "Docs — Document KYC" };

export default function DocsPage() {
  return (
    <PlaceholderPage
      icon={FileText}
      title="Developer Documentation"
      description="Integration guides and API references for the Document KYC identity and compliance platform."
      items={[
        {
          title: "Quick Start",
          body: "Create a sandbox tenant, issue an API key and run your first verification in under ten minutes.",
        },
        {
          title: "IDV REST API",
          body: "Create profile requests, poll verification status and download signed result reports.",
        },
        {
          title: "IDP Extraction API",
          body: "Submit documents to Nexus Layout or Template Sentinel and receive structured JSON.",
        },
        {
          title: "AML Screening API",
          body: "Screen entities against sanctions, PEP and adverse media lists with tunable fuzziness.",
        },
        {
          title: "Webhooks",
          body: "Subscribe to verification.completed, case.updated and monitoring.alert events.",
        },
        {
          title: "SDKs",
          body: "Drop-in Web, iOS and Android SDKs for capture, liveness and document scanning.",
        },
      ]}
    />
  );
}
