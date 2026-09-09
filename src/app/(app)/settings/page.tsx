import { Settings } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const metadata = { title: "Settings — Document KYC" };

export default function SettingsPage() {
  return (
    <PlaceholderPage
      icon={Settings}
      title="Workspace Settings"
      description="Configure workflows, thresholds and integrations for this Document KYC tenant."
      items={[
        {
          title: "Verification workflows",
          body: "Compose IDV, liveness, NFC and AML steps into reusable named workflows.",
        },
        {
          title: "Decision thresholds",
          body: "Tune face match and document confidence cut-offs per workflow.",
        },
        {
          title: "API keys",
          body: "Rotate sandbox and live keys, restrict by IP allowlist.",
        },
        {
          title: "Webhooks",
          body: "Register endpoints and replay failed deliveries.",
        },
        {
          title: "Branding",
          body: "Upload your logo and colors for the hosted verification flow.",
        },
        {
          title: "Data retention",
          body: "Set how long captured media and extracted data are retained.",
        },
      ]}
    />
  );
}
