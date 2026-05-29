interface InnerProps {
  colors: Record<string, string>;
  pid: string;
}

const CORNER_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

export default function GrannySquareInner({ colors, pid }: InnerProps) {
  const {
    center = "#D4A830",
    inner  = "#7A9E7E",
    outer  = "#C96B4A",
    border = "#3A6B45",
  } = colors;

  return (
    <>
      <defs>
        <pattern id={`${pid}-dots`} x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="6" cy="6" r="1.6" fill="black" fillOpacity="0.055" />
        </pattern>
        <clipPath id={`${pid}-clip`}>
          <rect x="0" y="0" width="400" height="400" rx="20" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${pid}-clip)`}>
        <rect x="0" y="0" width="400" height="400" fill={border} />
        <rect x="26" y="26" width="348" height="348" rx="14" fill={outer} />
        <rect x="28"  y="28"  width="50" height="50" rx="9" fill={border} />
        <rect x="322" y="28"  width="50" height="50" rx="9" fill={border} />
        <rect x="28"  y="322" width="50" height="50" rx="9" fill={border} />
        <rect x="322" y="322" width="50" height="50" rx="9" fill={border} />
        <rect x="84" y="84" width="232" height="232" rx="8" fill={inner} />
        <rect x="86"  y="86"  width="30" height="30" rx="5" fill={outer} />
        <rect x="284" y="86"  width="30" height="30" rx="5" fill={outer} />
        <rect x="86"  y="284" width="30" height="30" rx="5" fill={outer} />
        <rect x="284" y="284" width="30" height="30" rx="5" fill={outer} />
        <circle cx="200" cy="200" r="72" fill={center} />
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
        <rect x="0" y="0" width="400" height="400" fill={`url(#${pid}-dots)`} />
      </g>
    </>
  );
}
