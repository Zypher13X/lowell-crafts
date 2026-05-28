interface Props {
  colors: Record<string, string>;
  svgId?: string;
}

export default function BucketHatSVG({ colors, svgId }: Props) {
  const {
    crown = "#DDD0BC",
    band  = "#C96B4A",
    brim  = "#DDD0BC",
  } = colors;

  const pid = svgId ?? "hat-default";
  const crownPath = "M 50,250 C 50,85 180,42 200,42 C 220,42 350,85 350,250 Z";

  return (
    <svg
      id={svgId}
      viewBox="0 0 400 360"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      aria-label="Bucket hat color preview"
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
        <clipPath id={`${pid}-crown-clip`}>
          <path d={crownPath} />
        </clipPath>
        <clipPath id={`${pid}-brim-clip`}>
          <rect x="4" y="286" width="392" height="36" rx="18" />
        </clipPath>
      </defs>

      {/* ── Drop shadow ─────────────────────────────────── */}
      <ellipse cx="200" cy="350" rx="185" ry="10" fill="black" fillOpacity="0.07" />

      {/* ── Brim ────────────────────────────────────────── */}
      {/* Bottom face of brim */}
      <ellipse cx="200" cy="322" rx="193" ry="17" fill={brim} fillOpacity="0.55" />
      {/* Brim body */}
      <rect x="4" y="286" width="392" height="36" rx="18" fill={brim} />
      {/* Brim top surface ellipse */}
      <ellipse cx="200" cy="286" rx="196" ry="20" fill={brim} />
      {/* Brim texture */}
      <ellipse cx="200" cy="286" rx="196" ry="20" fill={`url(#${pid}-dots)`} />
      <rect x="4" y="286" width="392" height="36" rx="18" fill={`url(#${pid}-dots)`} />

      {/* ── Band ────────────────────────────────────────── */}
      <rect x="50" y="244" width="300" height="46" fill={band} />
      {/* Band stitch lines */}
      <line x1="50" y1="258" x2="350" y2="258" stroke="black" strokeOpacity="0.06" strokeWidth="1.5" strokeDasharray="8,5" />
      <line x1="50" y1="274" x2="350" y2="274" stroke="black" strokeOpacity="0.06" strokeWidth="1.5" strokeDasharray="8,5" />
      {/* Band texture */}
      <rect x="50" y="244" width="300" height="46" fill={`url(#${pid}-dots)`} />

      {/* ── Crown dome ──────────────────────────────────── */}
      <path d={crownPath} fill={crown} />
      {/* Horizontal stitch rounds (clipped to dome) */}
      <g clipPath={`url(#${pid}-crown-clip)`}>
        {[80, 110, 140, 168, 196, 222].map((y) => (
          <line
            key={y}
            x1="0" y1={y} x2="400" y2={y}
            stroke="black" strokeOpacity="0.06"
            strokeWidth="1.5" strokeDasharray="8,6"
          />
        ))}
        <rect x="0" y="0" width="400" height="400" fill={`url(#${pid}-dots)`} />
      </g>

      {/* ── Crown-to-band seam ───────────────────────────── */}
      <line x1="50" y1="250" x2="350" y2="250" stroke="black" strokeOpacity="0.08" strokeWidth="2" />
    </svg>
  );
}
