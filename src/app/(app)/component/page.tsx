import { Blocks } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const metadata = { title: "Component — Document KYC" };

export default function ComponentPage() {
  return (
    <PlaceholderPage
      icon={Blocks}
      title="Component Library"
      description="Embeddable widgets you can drop into your own product to collect and review identity data."
      items={[
        {
          title: "Capture Widget",
          body: "Hosted document capture and liveness flow, themable to match your brand.",
        },
        {
          title: "Review Console",
          body: "Embeddable case review panel for your compliance analysts.",
        },
        {
          title: "Status Badge",
          body: "Lightweight badge that reflects a live verification status in your UI.",
        },
        {
          title: "QR Handoff",
          body: "Desktop-to-mobile handoff component for camera-only capture steps.",
        },
        {
          title: "Consent Screen",
          body: "Configurable privacy and consent screen with jurisdiction presets.",
        },
        {
          title: "Result Report",
          body: "Printable PDF report component with checks, evidence and audit trail.",
        },
      ]}
    />
  );
}
