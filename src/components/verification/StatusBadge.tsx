import { Check, X } from "lucide-react";
import type { VerificationStatus } from "@/lib/data/idv";

const config: Record<
  VerificationStatus,
  { className: string; prefix: React.ReactNode }
> = {
  PASSED: {
    className: "bg-emerald-50 text-emerald-700",
    prefix: <Check className="h-3 w-3" strokeWidth={3} />,
  },
  REJECTED: {
    className: "bg-rose-50 text-rose-600",
    prefix: <X className="h-3 w-3" strokeWidth={3} />,
  },
  WARNING: {
    className: "bg-amber-50 text-amber-700",
    prefix: <span className="font-bold">!</span>,
  },
  PENDING: {
    className: "bg-gray-100 text-gray-500",
    prefix: <span className="font-bold tracking-tighter">…</span>,
  },
};

export function StatusBadge({ status }: { status: VerificationStatus }) {
  const { className, prefix } = config[status];
  return (
    <span
      className={`inline-flex min-w-[92px] items-center justify-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-bold tracking-wide ${className}`}
    >
      {prefix}
      {status}
    </span>
  );
}
