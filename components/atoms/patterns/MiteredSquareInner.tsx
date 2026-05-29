interface InnerProps {
  colors: Record<string, string>;
  pid: string;
}

export default function MiteredSquareInner({ colors, pid }: InnerProps) {
  const {
    primary   = "#D4A830",
    secondary = "#7A9E7E",
    border    = "#3A6B45",
  } = colors;

  return (
    <>
      <defs>
        <pattern id={`${pid}-dots`} x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="6" cy="6" r="1.5" fill="black" fillOpacity="0.05" />
        </pattern>
        <clipPath id={`${pid}-inner-clip`}>
          <rect x="38" y="38" width="324" height="324" rx="10" />
        </clipPath>
      </defs>

      <rect x="18" y="18" width="364" height="364" rx="20" fill="black" fillOpacity="0.07" />
      <rect x="14" y="14" width="372" height="372" rx="18" fill={border} />
      <rect x="26" y="26" width="348" height="348" rx="16"
        fill="none" stroke="black" strokeOpacity="0.06" strokeWidth="1.5" strokeDasharray="10,7" />

      <g clipPath={`url(#${pid}-inner-clip)`}>
        <polygon points="38,38 362,38 362,362" fill={primary} />
        <polygon points="38,38 38,362 362,362" fill={secondary} />
        {[0, 16, 32].map((offset) => (
          <line
            key={offset}
            x1={38 + offset} y1={38 + offset}
            x2={362 - offset} y2={362 - offset}
            stroke="black" strokeOpacity="0.08"
            strokeWidth="1.5" strokeDasharray="10,6"
          />
        ))}
        <rect x="38" y="38" width="324" height="324" fill={`url(#${pid}-dots)`} />
      </g>
    </>
  );
}
