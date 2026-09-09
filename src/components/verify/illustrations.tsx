export function IdCardFrontArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 110" className={className} role="img" aria-label="Front of ID card">
      <defs>
        <linearGradient id="idFront" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#dff3ea" />
          <stop offset="100%" stopColor="#c4e7dc" />
        </linearGradient>
      </defs>
      <rect width="180" height="110" rx="8" fill="url(#idFront)" />
      <rect x="8" y="8" width="164" height="16" rx="4" fill="#9fd6c2" opacity="0.55" />
      <text x="52" y="20" fontSize="9" fontWeight="700" fill="#3f7f68">
        ID CARD
      </text>
      <rect x="12" y="16" width="12" height="9" rx="2" fill="#fff" opacity="0.85" />

      <rect x="14" y="34" width="40" height="50" rx="4" fill="#a9dcca" />
      <circle cx="34" cy="52" r="11" fill="#7fbfa9" />
      <path d="M18 84c2-13 8-20 16-20s14 7 16 20z" fill="#7fbfa9" />

      <g fill="#8ecdb7">
        {[36, 46, 56, 66].map((y, i) => (
          <rect key={y} x="62" y={y} width={i % 2 ? 62 : 84} height="5" rx="2.5" />
        ))}
      </g>
      <circle cx="152" cy="42" r="12" fill="#a9dcca" />
      <path d="M144 42h16M152 34v16" stroke="#7fbfa9" strokeWidth="1.5" />

      <rect x="14" y="92" width="152" height="8" rx="2" fill="#9fd6c2" opacity="0.8" />
      <text x="18" y="99" fontSize="5.5" fill="#4d8a75" fontFamily="monospace">
        ID&lt;123456789&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
      </text>
    </svg>
  );
}

export function IdCardBackArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 110" className={className} role="img" aria-label="Back of ID card">
      <defs>
        <linearGradient id="idBack" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e2f4ec" />
          <stop offset="100%" stopColor="#c7e9dd" />
        </linearGradient>
      </defs>
      <rect width="180" height="110" rx="8" fill="url(#idBack)" />

      <g fill="#5c8f7c">
        {Array.from({ length: 46 }, (_, i) => (
          <rect
            key={i}
            x={12 + i * 2.6}
            y="12"
            width={i % 3 === 0 ? 1.6 : 0.9}
            height="14"
            rx="0.4"
          />
        ))}
      </g>
      <text x="140" y="22" fontSize="6" fill="#5c8f7c" fontFamily="monospace">
        0123456789
      </text>

      <rect x="14" y="36" width="22" height="16" rx="3" fill="#e0c98a" />
      <path d="M14 44h22M25 36v16" stroke="#c9ae68" strokeWidth="1.2" />

      <g fill="#8ecdb7">
        {[36, 46, 56].map((y, i) => (
          <rect key={y} x="44" y={y} width={i === 1 ? 108 : 122} height="6" rx="3" />
        ))}
      </g>

      <rect x="14" y="66" width="152" height="6" rx="3" fill="#9fd6c2" />

      <text x="14" y="86" fontSize="6" fill="#4d8a75" fontFamily="monospace">
        ID0123456789&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
      </text>
      <text x="14" y="96" fontSize="6" fill="#4d8a75" fontFamily="monospace">
        &lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
      </text>
    </svg>
  );
}
