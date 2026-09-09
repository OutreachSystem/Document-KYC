import { CircleUserRound } from "lucide-react";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const metadata = { title: "Profile — Document KYC" };

export default function ProfilePage() {
  return (
    <PlaceholderPage
      icon={CircleUserRound}
      title="Your Profile"
      description="Account details for the signed-in operator of this Document KYC workspace."
      items={[
        { title: "Name", body: "Demo Operator" },
        { title: "Email", body: "demo@documentkyc.com" },
        { title: "Role", body: "Compliance Administrator" },
        { title: "Tenant", body: "Document KYC Sandbox (Cloud)" },
        { title: "Two-factor auth", body: "Enabled via authenticator app" },
        { title: "Last sign-in", body: "Today at 09:14 from Amman, JO" },
      ]}
    />
  );
}
