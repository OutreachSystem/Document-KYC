import type { Metadata } from "next";
import { IdpView } from "./IdpView";

export const metadata: Metadata = { title: "IDP — Document KYC" };

export default function IdpPage() {
  return <IdpView />;
}
