interface Props {
  colors: Record<string, string>;
  svgId?: string;
}

export default function MarketToteSVG({ colors, svgId }: Props) {
  const {
    body    = "#F5EDD8",
    handles = "#C96B4A",
    accent  = "#7A9E7E",
  } = colors;

  const pid = svgId ?? "tote-default";

  return (
    <svg
      id={svgId}
      viewBox="0 0 400 420"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      aria-label="Market tote color preview"
      role="img"
    >
      <defs>
        <pattern
          id={`${pid}-dots`}
          x="0" y="0" width="12" height="12"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="6" cy="6" r="1.6" fill="black" fillOpacity="0.055" />
        </pattern>
        <clipPath id={`${pid}-body-clip`}>
          <rect x="62" y="94" width="276" height="288" rx="12" />
        </clipPath>
      </defs>

      {/* ── Drop shadow ─────────────────────────────────── */}
      <ellipse cx="200" cy="406" rx="132" ry="10" fill="black" fillOpacity="0.07" />

      {/* ── Handles (behind body at connection point) ────── */}
      <path
        d="M 114,94 C 114,22 174,22 174,94"
        fill="none" stroke={handles}
        strokeWidth="22" strokeLinecap="round"
      />
      <path
        d="M 226,94 C 226,22 286,22 286,94"
        fill="none" stroke={handles}
        strokeWidth="22" strokeLinecap="round"
      />

      {/* ── Bag body ────────────────────────────────────── */}
      <rect x="62" y="94" width="276" height="288" rx="12" fill={body} />

      {/* Accent stripe — clipped to body shape */}
      <g clipPath={`url(#${pid}-body-clip)`}>
        <rect x="62" y="334" width="276" height="48" fill={accent} />
        <rect x="62" y="334" width="276" height="48" fill={`url(#${pid}-dots)`} />
      </g>

      {/* Vertical seam lines */}
      <line x1="62"  y1="106" x2="62"  y2="382" stroke="black" strokeOpacity="0.05" strokeWidth="1.5" />
      <line x1="338" y1="106" x2="338" y2="382" stroke="black" strokeOpacity="0.05" strokeWidth="1.5" />

      {/* Horizontal stitch rows on body */}
      {[130, 170, 210, 250, 290].map((y) => (
        <line
          key={y}
          x1="68" y1={y} x2="332" y2={y}
          stroke="black" strokeOpacity="0.05"
          strokeWidth="1" strokeDasharray="10,7"
          clipPath={`url(#${pid}-body-clip)`}
        />
      ))}

      {/* Body texture overlay */}
      <rect x="62" y="94" width="276" height="288" rx="12" fill={`url(#${pid}-dots)`} />

      {/* ── Top opening fold ────────────────────────────── */}
      <rect x="62" y="94" width="276" height="14" rx="6" fill="black" fillOpacity="0.06" />

      {/* Handle attachment reinforcement patches */}
      <rect x="104" y="94" width="36" height="18" rx="4" fill={handles} fillOpacity="0.5" />
      <rect x="260" y="94" width="36" height="18" rx="4" fill={handles} fillOpacity="0.5" />
    </svg>
  );
}
