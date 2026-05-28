interface Props {
  colors: Record<string, string>;
  svgId?: string;
}

export default function MiteredSquareSVG({ colors, svgId }: Props) {
  const {
    primary   = "#D4A830",
    secondary = "#7A9E7E",
    border    = "#3A6B45",
  } = colors;

  const pid = svgId ?? "mitered-default";

  return (
    <svg
      id={svgId}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      aria-label="Mitered granny square colour preview"
      role="img"
    >
      <defs>
        <pattern
          id={`${pid}-dots`}
          x="0" y="0" width="12" height="12"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="6" cy="6" r="1.5" fill="black" fillOpacity="0.05" />
        </pattern>
        <clipPath id={`${pid}-sq-clip`}>
          <rect x="14" y="14" width="372" height="372" rx="18" />
        </clipPath>
      </defs>

      {/* Drop shadow */}
      <rect x="18" y="18" width="364" height="364" rx="20" fill="black" fillOpacity="0.07" />

      {/* Border square */}
      <rect x="14" y="14" width="372" height="372" rx="18" fill={border} />

      {/* Primary triangle: top-left + top-right + bottom-right */}
      <g clipPath={`url(#${pid}-sq-clip)`}>
        <polygon points="14,14 386,14 386,386" fill={primary} />
        {/* Secondary triangle: top-left + bottom-left + bottom-right */}
        <polygon points="14,14 14,386 386,386" fill={secondary} />

        {/* Diagonal ridge lines */}
        {[0, 18, 36].map((offset) => (
          <line
            key={offset}
            x1={14 + offset} y1={14 + offset}
            x2={386 - offset} y2={386 - offset}
            stroke="black" strokeOpacity="0.08"
            strokeWidth="1.5" strokeDasharray="10,6"
          />
        ))}

        {/* Texture */}
        <rect x="14" y="14" width="372" height="372" rx="18" fill={`url(#${pid}-dots)`} />
      </g>

      {/* Border stitch outline */}
      <rect x="26" y="26" width="348" height="348" rx="16"
        fill="none" stroke="black" strokeOpacity="0.06" strokeWidth="1.5" strokeDasharray="10,7" />
    </svg>
  );
}
