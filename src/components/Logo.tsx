type LogoMarkProps = {
  size?: number;
  monochrome?: "white" | "ink" | null;
  className?: string;
};

// Stylised AGEON M-arrow mark — yellow descender + red zig-zag arrow
export function LogoMark({ size = 56, monochrome = null, className = "" }: LogoMarkProps) {
  const yellow = monochrome ? "currentColor" : "#FFCA05";
  const red = monochrome ? "currentColor" : "#C3161C";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ color: monochrome === "white" ? "#fff" : monochrome === "ink" ? "#231F20" : undefined }}
      aria-label="Ageon"
    >
      {/* yellow left stroke (M descender) */}
      <path
        d="M22 86 L22 18 L40 18 L52 50 L40 50 Z"
        fill={yellow}
        opacity={0.95}
      />
      {/* red zig-zag arrow */}
      <path
        d="M78 14 L78 82 L60 82 L48 50 L62 50 L62 36 L48 36 L60 14 Z"
        fill={red}
        opacity={0.95}
      />
    </svg>
  );
}

export function LogoWordmark({
  className = "",
  color = "currentColor",
  showTagline = true,
}: {
  className?: string;
  color?: string;
  showTagline?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoMark size={36} />
      <div className="flex flex-col leading-none">
        <span
          className="font-display font-light tracking-[0.18em] text-[1.4rem]"
          style={{ color }}
        >
          AGEON
        </span>
        {showTagline && (
          <span
            className="text-[0.55rem] tracking-[0.3em] mt-1 opacity-70"
            style={{ color }}
          >
            LONGEVITY &amp; RECOVERY
          </span>
        )}
      </div>
    </div>
  );
}
