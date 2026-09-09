import type { ReactNode } from "react";

export type BadgeTone =
  | "passed"
  | "rejected"
  | "warning"
  | "pending"
  | "neutral"
  | "brand"
  | "info"
  | "success"
  | "danger";

const toneStyles: Record<BadgeTone, string> = {
  passed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  success: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  rejected: "bg-rose-50 text-rose-600 ring-rose-200",
  danger: "bg-rose-50 text-rose-600 ring-rose-200",
  warning: "bg-amber-50 text-amber-700 ring-amber-200",
  pending: "bg-gray-100 text-gray-600 ring-gray-200",
  neutral: "bg-gray-100 text-gray-600 ring-gray-200",
  brand: "bg-brand-50 text-brand-700 ring-brand-200",
  info: "bg-sky-50 text-sky-700 ring-sky-200",
};

export function Badge({
  tone = "neutral",
  children,
  className = "",
}: {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${toneStyles[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/** The DOC / NFC / LIV / FM / AML pills shown on verification rows. */
export function CheckPill({
  label,
  state,
}: {
  label: string;
  state: "passed" | "failed" | "warning" | "idle";
}) {
  const styles = {
    passed: "bg-emerald-50 text-emerald-600",
    failed: "bg-rose-50 text-rose-500",
    warning: "bg-amber-50 text-amber-600",
    idle: "bg-gray-100 text-gray-400",
  }[state];

  return (
    <span
      className={`inline-flex min-w-[34px] justify-center rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase ${styles}`}
    >
      {label}
    </span>
  );
}
