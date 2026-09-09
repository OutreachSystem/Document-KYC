import type { Metadata } from "next";
import { AmlView } from "./AmlView";

export const metadata: Metadata = { title: "AML — Document KYC" };

export default function AmlPage() {
  return <AmlView />;
}
