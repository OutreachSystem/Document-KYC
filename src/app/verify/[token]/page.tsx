import type { Metadata } from "next";
import { VerifyWizard } from "./VerifyWizard";

export const metadata: Metadata = {
  title: "Identification Session — Document KYC",
};

export default function VerifyPage() {
  return <VerifyWizard />;
}
