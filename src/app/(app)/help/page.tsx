import { CircleHelp } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const metadata = { title: "Help — Document KYC" };

export default function HelpPage() {
  return (
    <PlaceholderPage
      icon={CircleHelp}
      title="Help & Support"
      description="Answers to common questions, plus direct routes to the Document KYC support team."
      items={[
        {
          title: "Why was a verification rejected?",
          body: "Review the Checks Summary on the verification detail page for the failing signal.",
        },
        {
          title: "Understanding fuzziness levels",
          body: "Higher fuzziness widens AML name matching and increases potential match volume.",
        },
        {
          title: "Supported documents",
          body: "Passports, national ID cards and driver licenses across 190+ issuing countries.",
        },
        {
          title: "Sandbox vs Live",
          body: "Sandbox tenants return simulated decisions and never bill against your quota.",
        },
        {
          title: "Contact support",
          body: "Reach the compliance engineering team at support@documentkyc.com, 24/5.",
        },
        {
          title: "Service status",
          body: "Live uptime and incident history for all Document KYC regional endpoints.",
        },
      ]}
    />
  );
}
