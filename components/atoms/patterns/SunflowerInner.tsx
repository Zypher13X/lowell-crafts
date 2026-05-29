interface InnerProps {
  colors: Record<string, string>;
  pid: string;
}

const CX = 200;
const CY = 200;
const PETAL_COUNT = 8;

function petalPath(index: number): string {
  const angle = (index * 360) / PETAL_COUNT;
  const rad = (angle * Math.PI) / 180;
  const innerR = 52;
  const outerR = 138;
  const halfArc = 18;
  const halfArcRad = (halfArc * Math.PI) / 180;

  const lx = +(CX + innerR * Math.cos(rad - halfArcRad)).toFixed(1);
  const ly = +(CY + innerR * Math.sin(rad - halfArcRad)).toFixed(1);
  const rx = +(CX + innerR * Math.cos(rad + halfArcRad)).toFixed(1);
  const ry = +(CY + innerR * Math.sin(rad + halfArcRad)).toFixed(1);
  const tipX = +(CX + outerR * Math.cos(rad)).toFixed(1);
  const tipY = +(CY + outerR * Math.sin(rad)).toFixed(1);
  const c1x = +(CX + (innerR + 60) * Math.cos(rad - halfArcRad * 0.6)).toFixed(1);
  const c1y = +(CY + (innerR + 60) * Math.sin(rad - halfArcRad * 0.6)).toFixed(1);
  const c2x = +(CX + (innerR + 60) * Math.cos(rad + halfArcRad * 0.6)).toFixed(1);
  const c2y = +(CY + (innerR + 60) * Math.sin(rad + halfArcRad * 0.6)).toFixed(1);

  return `M ${lx},${ly} C ${c1x},${c1y} ${tipX},${tipY} ${tipX},${tipY} C ${tipX},${tipY} ${c2x},${c2y} ${rx},${ry} Z`;
}

export default function SunflowerInner({ colors, pid }: InnerProps) {
  const {
    center = "#D4A830",
    petals = "#C96B4A",
    border = "#3A6B45",
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
      <rect x="14" y="14" width="372" height="372" rx="18" fill={border} />

      {[[50, 50], [350, 50], [50, 350], [350, 350]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="10" fill={petals} fillOpacity="0.4" />
      ))}

      <g clipPath={`url(#${pid}-sq-clip)`}>
        {Array.from({ length: PETAL_COUNT }, (_, i) => (
          <path key={i} d={petalPath(i)} fill={petals} />
        ))}
        {Array.from({ length: PETAL_COUNT }, (_, i) => (
          <path key={`t${i}`} d={petalPath(i)} fill={`url(#${pid}-dots)`} />
        ))}
      </g>

      <circle cx={CX} cy={CY} r="48" fill={center} />
      <circle cx={CX} cy={CY} r="38" fill="none"
        stroke="black" strokeOpacity="0.08" strokeWidth="1.5" strokeDasharray="8,5" />
      <circle cx={CX} cy={CY} r="48" fill={`url(#${pid}-dots)`} />

      <rect x="26" y="26" width="348" height="348" rx="16"
        fill="none" stroke="black" strokeOpacity="0.06" strokeWidth="1.5" strokeDasharray="10,7" />
    </>
  );
}
