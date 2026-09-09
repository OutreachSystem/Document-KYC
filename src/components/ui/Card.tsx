import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl bg-white shadow-sm ring-1 ring-gray-200/70 ${className}`}>
      {children}
    </div>
  );
}

export function ChartCard({
  title,
  subtitle,
  children,
  className = "",
  action,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}) {
  return (
    <Card className={`flex flex-col p-5 ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[15px] font-bold text-gray-900">{title}</h3>
          {subtitle && (
            <p className="mt-1.5 text-[11px] text-gray-500">{subtitle}</p>
          )}
        </div>
        {action}
      </div>
      <div className="mt-4 flex-1">{children}</div>
    </Card>
  );
}
