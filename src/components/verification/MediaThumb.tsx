/**
 * The showcase build has no captured media, so evidence images are drawn as
 * neutral SVG stand-ins that keep the layout faithful to the real product.
 */
export function MediaThumb({
  kind,
  className = "",
  seed = 0,
}: {
  kind: "face" | "doc" | "ghost";
  className?: string;
  seed?: number;
}) {
  const hues = [212, 258, 172, 24, 330];
  const hue = hues[seed % hues.length];

  if (kind === "doc") {
    return (
      <svg viewBox="0 0 120 76" className={className} role="img" aria-label="Document image">
        <rect width="120" height="76" rx="6" fill={`hsl(${hue} 40% 92%)`} />
        <rect x="8" y="8" width="34" height="42" rx="4" fill={`hsl(${hue} 30% 78%)`} />
        <circle cx="25" cy="24" r="10" fill={`hsl(${hue} 25% 62%)`} />
        <path d="M11 50c2-9 8-13 14-13s12 4 14 13z" fill={`hsl(${hue} 25% 62%)`} />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x="50"
            y={12 + i * 9}
            width={i % 2 ? 46 : 58}
            height="4"
            rx="2"
            fill={`hsl(${hue} 28% 74%)`}
          />
        ))}
        <rect x="8" y="58" width="104" height="10" rx="2" fill={`hsl(${hue} 22% 82%)`} />
      </svg>
    );
  }

  if (kind === "ghost") {
    return (
      <svg viewBox="0 0 100 120" className={className} role="img" aria-label="Ghost portrait">
        <rect width="100" height="120" rx="6" fill="#dcd7e6" />
        <circle cx="50" cy="46" r="22" fill="#c2bad4" opacity="0.7" />
        <path d="M14 120c4-26 18-38 36-38s32 12 36 38z" fill="#c2bad4" opacity="0.7" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 100 120" className={className} role="img" aria-label="Face image">
      <defs>
        <linearGradient id={`bg-${seed}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={`hsl(${hue} 30% 88%)`} />
          <stop offset="100%" stopColor={`hsl(${hue} 25% 78%)`} />
        </linearGradient>
      </defs>
      <rect width="100" height="120" rx="6" fill={`url(#bg-${seed})`} />
      <circle cx="50" cy="45" r="21" fill="#9a8f7f" />
      <path d="M29 30c2-12 12-18 21-18s19 6 21 18c-6-5-14-7-21-7s-15 2-21 7z" fill="#3f3a33" />
      <path d="M16 120c4-25 17-37 34-37s30 12 34 37z" fill="#4b5563" />
    </svg>
  );
}
