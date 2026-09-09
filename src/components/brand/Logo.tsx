type LogoProps = {
  className?: string;
  /** Renders the compact mark only, used when the sidebar is collapsed. */
  markOnly?: boolean;
};

export function Logo({ className = "", markOnly = false }: LogoProps) {
  if (markOnly) {
    return (
      <span
        className={`inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700 text-sm font-bold tracking-tight text-white ${className}`}
      >
        DK
      </span>
    );
  }

  return (
    <span
      className={`inline-flex select-none items-baseline gap-[0.28em] font-bold leading-none tracking-tight ${className}`}
    >
      <span className="relative text-brand-700">
        <span className="relative text-[1.18em]">D</span>
        <span className="absolute -top-[0.2em] left-[0.4em] h-[0.13em] w-[0.13em] rounded-full bg-brand-500" />
        ocument
      </span>
      <span className="text-brand-400">KYC</span>
    </span>
  );
}
