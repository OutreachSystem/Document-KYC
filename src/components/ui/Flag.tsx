const flagByCode: Record<string, string> = {
  JOR: "🇯🇴",
  IRQ: "🇮🇶",
  PSE: "🇵🇸",
  SAU: "🇸🇦",
  KSA: "🇸🇦",
  USA: "🇺🇸",
  UAE: "🇦🇪",
  ISR: "🇮🇱",
  EGY: "🇪🇬",
  GBR: "🇬🇧",
};

export function Flag({ code }: { code: string }) {
  const flag = flagByCode[code.toUpperCase()];
  if (!flag) return <span className="text-gray-400">—</span>;
  return (
    <span className="text-base leading-none" aria-label={code}>
      {flag}
    </span>
  );
}

export function FlagWithCode({ code }: { code: string }) {
  if (!code || code === "---") return <span className="text-gray-400">---</span>;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-gray-700">
      <Flag code={code} />
      {code.toUpperCase()}
    </span>
  );
}
