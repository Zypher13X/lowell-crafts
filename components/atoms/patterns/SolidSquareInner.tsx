interface InnerProps {
  colors: Record<string, string>;
  pid: string;
}

export default function SolidSquareInner({ colors, pid }: InnerProps) {
  const {
    center = "#D4A830",
    ring   = "#7A9E7E",
    border = "#3A6B45",
  } = colors;

  return (
    <>
      <defs>
        <pattern id={`${pid}-dots`} x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="6" cy="6" r="1.5" fill="black" fillOpacity="0.05" />
        </pattern>
      </defs>

      <rect x="18" y="18" width="364" height="364" rx="20" fill="black" fillOpacity="0.07" />
      <rect x="14" y="14" width="372" height="372" rx="18" fill={border} />
      <rect x="68" y="68" width="264" height="264" rx="12" fill={ring} />
      <rect x="122" y="122" width="156" height="156" rx="8" fill={center} />

      {[30, 46].map((o) => (
        <rect key={o} x={14 + o} y={14 + o} width={372 - o * 2} height={372 - o * 2}
          rx={16} fill="none"
          stroke="black" strokeOpacity="0.06" strokeWidth="1.5" strokeDasharray="10,7" />
      ))}
      {[12, 24].map((o) => (
        <rect key={o} x={68 + o} y={68 + o} width={264 - o * 2} height={264 - o * 2}
          rx={10} fill="none"
          stroke="black" strokeOpacity="0.06" strokeWidth="1.5" strokeDasharray="10,7" />
      ))}
      <rect x="134" y="134" width="132" height="132" rx="6"
        fill="none" stroke="black" strokeOpacity="0.06" strokeWidth="1.5" strokeDasharray="10,7" />
      <rect x="14" y="14" width="372" height="372" rx="18" fill={`url(#${pid}-dots)`} />
    </>
  );
}
