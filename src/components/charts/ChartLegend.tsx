export function ChartLegend({
  items,
}: {
  items: { label: string; color: string }[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
      {items.map(({ label, color }) => (
        <span key={label} className="flex items-center gap-1.5 text-[11px] text-gray-600">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: color }}
          />
          {label}
        </span>
      ))}
    </div>
  );
}
