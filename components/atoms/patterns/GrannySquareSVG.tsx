interface Props {
  colors: Record<string, string>;
  svgId?: string;
}

const CORNER_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

export default function GrannySquareSVG({ colors, svgId }: Props) {
  const {
    center = "#D4A830",
    inner  = "#7A9E7E",
    outer  = "#C96B4A",
    border = "#3A6B45",
  } = colors;

  const pid = svgId ?? "gs-default";

  return (
    <svg
      id={svgId}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      aria-label="Granny square color preview"
      role="img"
    >
      <defs>
        {/* Subtle stitch-dot texture */}
        <pattern
          id={`${pid}-dots`}
          x="0"
          y="0"
          width="12"
          height="12"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="6" cy="6" r="1.6" fill="black" fillOpacity="0.055" />
        </pattern>

        {/* Clip to outer rounded rect */}
        <clipPath id={`${pid}-clip`}>
          <rect x="0" y="0" width="400" height="400" rx="20" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${pid}-clip)`}>
        {/* ── Border ring ─────────────────────────────────── */}
        <rect x="0" y="0" width="400" height="400" fill={border} />

        {/* ── Outer round ─────────────────────────────────── */}
        <rect x="26" y="26" width="348" height="348" rx="14" fill={outer} />

        {/* ch-2 corner spaces — show border color */}
        <rect x="28" y="28"  width="50" height="50" rx="9" fill={border} />
        <rect x="322" y="28" width="50" height="50" rx="9" fill={border} />
        <rect x="28" y="322" width="50" height="50" rx="9" fill={border} />
        <rect x="322" y="322" width="50" height="50" rx="9" fill={border} />

        {/* ── Inner round ─────────────────────────────────── */}
        <rect x="84" y="84" width="232" height="232" rx="8" fill={inner} />

        {/* ch-2 corner spaces on inner round — show outer color */}
        <rect x="86"  y="86"  width="30" height="30" rx="5" fill={outer} />
        <rect x="284" y="86"  width="30" height="30" rx="5" fill={outer} />
        <rect x="86"  y="284" width="30" height="30" rx="5" fill={outer} />
        <rect x="284" y="284" width="30" height="30" rx="5" fill={outer} />

        {/* ── Center cluster ──────────────────────────────── */}
        <circle cx="200" cy="200" r="72" fill={center} />

        {/* DC-stitch bumps around center edge */}
        {CORNER_ANGLES.map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <circle
              key={deg}
              cx={200 + 80 * Math.cos(rad)}
              cy={200 + 80 * Math.sin(rad)}
              r="5"
              fill={inner}
              fillOpacity="0.35"
            />
          );
        })}

        {/* ── Stitch-dot texture overlay ───────────────────── */}
        <rect x="0" y="0" width="400" height="400" fill={`url(#${pid}-dots)`} />
      </g>
    </svg>
  );
}
