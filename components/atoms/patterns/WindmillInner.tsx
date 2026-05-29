interface InnerProps {
  colors: Record<string, string>;
  pid: string;
}

const CX = 200;
const CY = 200;

function bladePath(index: number): string {
  const corners = [[14, 14], [386, 14], [386, 386], [14, 386]];
  const midpoints = [[200, 14], [386, 200], [200, 386], [14, 200]];

  const corner = corners[index];
  const mid1 = midpoints[index];
  const mid2 = midpoints[(index + 3) % 4];

  return `M ${CX},${CY} L ${mid1[0]},${mid1[1]} L ${corner[0]},${corner[1]} L ${mid2[0]},${mid2[1]} Z`;
}

export default function WindmillInner({ colors, pid }: InnerProps) {
  const {
    blade     = "#C96B4A",
    alternate = "#7A9E7E",
    center    = "#D4A830",
  } = colors;

  return (
    <>
      <defs>
        <pattern id={`${pid}-dots`} x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="6" cy="6" r="1.5" fill="black" fillOpacity="0.05" />
        </pattern>
        <clipPath id={`${pid}-sq-clip`}>
          <rect x="14" y="14" width="372" height="372" rx="18" />
        </clipPath>
      </defs>

      <rect x="18" y="18" width="364" height="364" rx="20" fill="black" fillOpacity="0.07" />
      <rect x="14" y="14" width="372" height="372" rx="18" fill={alternate} />

      <g clipPath={`url(#${pid}-sq-clip)`}>
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={bladePath(i)} fill={i % 2 === 0 ? blade : alternate} />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <path key={`s${i}`} d={bladePath(i)} fill="none"
            stroke="black" strokeOpacity="0.06" strokeWidth="1.5" strokeDasharray="10,7" />
        ))}
        <rect x="14" y="14" width="372" height="372" fill={`url(#${pid}-dots)`} />
      </g>

      <circle cx={CX} cy={CY} r="34" fill={center} />
      <circle cx={CX} cy={CY} r="24" fill="none"
        stroke="black" strokeOpacity="0.08" strokeWidth="1.5" strokeDasharray="8,5" />
      <circle cx={CX} cy={CY} r="34" fill={`url(#${pid}-dots)`} />

      <rect x="26" y="26" width="348" height="348" rx="16"
        fill="none" stroke="black" strokeOpacity="0.06" strokeWidth="1.5" strokeDasharray="10,7" />
    </>
  );
}
