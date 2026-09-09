import type { Metadata } from "next";
import { CustomersView } from "./CustomersView";

export const metadata: Metadata = { title: "Customers — Document KYC" };

export default function CustomersPage() {
  return <CustomersView />;
}
