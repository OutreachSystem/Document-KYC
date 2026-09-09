import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function PlaceholderPage({
  icon: Icon,
  title,
  description,
  items,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  items: { title: string; body: string }[];
}) {
  return (
    <div className="p-5">
      <Card className="p-8">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-[18px] font-bold text-gray-900">{title}</h1>
            <p className="mt-1 max-w-xl text-[12px] leading-relaxed text-gray-500">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-gray-100 px-4 py-4 transition hover:border-brand-200 hover:bg-brand-50/30"
            >
              <p className="text-[13px] font-semibold text-gray-800">
                {item.title}
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-gray-500">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
