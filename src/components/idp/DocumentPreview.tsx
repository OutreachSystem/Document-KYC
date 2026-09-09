/** Stand-in artwork for the scanned document shown in the extract viewer. */
export function IdCardPreview({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 340 214" className={className} role="img" aria-label="Scanned ID card">
      <rect width="340" height="214" rx="8" fill="#dfe7ea" />
      <rect x="6" y="6" width="328" height="202" rx="6" fill="#e9f0f2" />
      <rect x="6" y="6" width="328" height="34" rx="6" fill="#d3e0e4" />
      <text x="170" y="22" textAnchor="middle" fontSize="7" fill="#5b6b70">
        THE HASHEMITE KINGDOM OF JORDAN
      </text>
      <text x="170" y="33" textAnchor="middle" fontSize="6" fill="#7b8a8f">
        Ministry of Interior · Civil Status &amp; Passport Dept.
      </text>

      <rect x="18" y="52" width="86" height="106" rx="4" fill="#b9c8cd" />
      <circle cx="61" cy="88" r="23" fill="#8d7f6e" />
      <path d="M36 30" />
      <path d="M38 158c3-27 12-40 23-40s20 13 23 40z" fill="#4a5560" />
      <path d="M40 74c2-14 11-21 21-21s19 7 21 21c-6-6-13-9-21-9s-15 3-21 9z" fill="#38332c" />

      <rect x="16" y="164" width="140" height="8" rx="2" fill="#c2cfd4" />

      {[
        { y: 58, w: 150 },
        { y: 74, w: 120 },
        { y: 90, w: 165 },
        { y: 106, w: 132 },
        { y: 122, w: 148 },
        { y: 138, w: 110 },
      ].map((row) => (
        <rect
          key={row.y}
          x={118}
          y={row.y}
          width={row.w}
          height="7"
          rx="3"
          fill="#aabcc2"
        />
      ))}

      <rect x="118" y="152" width="200" height="7" rx="3" fill="#93a7ae" />
      <rect x="16" y="180" width="308" height="20" rx="3" fill="#cbd8dc" />
      <text x="24" y="194" fontSize="8" fill="#6b7b80" fontFamily="monospace">
        IDJOR9871018201&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
      </text>
    </svg>
  );
}

export function PermitPreview({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 400" className={className} role="img" aria-label="Scanned permit document">
      <rect width="300" height="400" rx="4" fill="#ffffff" />
      <circle cx="60" cy="42" r="20" fill="#e8e4ef" />
      <circle cx="150" cy="42" r="20" fill="#e8e4ef" />
      <circle cx="240" cy="42" r="20" fill="#e8e4ef" />
      <text x="150" y="86" textAnchor="middle" fontSize="7" fill="#8b8b8b">
        رخصة مهنية — Professional License
      </text>

      <rect x="24" y="102" width="252" height="9" rx="2" fill="#ebebeb" />
      {[124, 140, 156, 172, 188, 204].map((y, i) => (
        <g key={y}>
          <rect x={24} y={y} width={i % 2 ? 110 : 140} height="6" rx="2" fill="#f0f0f0" />
          <rect x={180} y={y} width={i % 2 ? 84 : 96} height="6" rx="2" fill="#f0f0f0" />
        </g>
      ))}

      <rect x="24" y="224" width="252" height="9" rx="2" fill="#ebebeb" />
      {[246, 262, 278].map((y) => (
        <rect key={y} x={24} y={y} width={200} height="6" rx="2" fill="#f2f2f2" />
      ))}

      <rect x="24" y="300" width="252" height="9" rx="2" fill="#ebebeb" />
      <rect x="24" y="322" width="150" height="6" rx="2" fill="#f2f2f2" />

      <rect x="24" y="344" width="44" height="44" fill="#2f2f2f" />
      <rect x="30" y="350" width="8" height="8" fill="#fff" />
      <rect x="54" y="350" width="8" height="8" fill="#fff" />
      <rect x="30" y="374" width="8" height="8" fill="#fff" />
      <rect x="42" y="362" width="6" height="6" fill="#fff" />
    </svg>
  );
}
