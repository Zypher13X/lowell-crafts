interface InnerProps {
  colors: Record<string, string>;
  pid: string;
}

const RINGS = [
  { key: "ring4", x: 14,  y: 14,  w: 372, h: 372, rx: 18 },
  { key: "ring3", x: 64,  y: 64,  w: 272, h: 272, rx: 12 },
  { key: "ring2", x: 114, y: 114, w: 172, h: 172, rx: 8  },
  { key: "ring1", x: 164, y: 164, w: 72,  h: 72,  rx: 5  },
];

export default function StripedSquareInner({ colors, pid }: InnerProps) {
  const {
    ring1 = "#D4A830",
    ring2 = "#7A9E7E",
    ring3 = "#C96B4A",
    ring4 = "#3A6B45",
  } = colors;

  const colorMap: Record<string, string> = { ring1, ring2, ring3, ring4 };

  return (
    <>
      <defs>
        <pattern id={`${pid}-dots`} x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="6" cy="6" r="1.5" fill="black" fillOpacity="0.05" />
        </pattern>
      </defs>

      <rect x="18" y="18" width="364" height="364" rx="20" fill="black" fillOpacity="0.07" />

      {RINGS.map((r) => (
        <rect key={r.key} x={r.x} y={r.y} width={r.w} height={r.h} rx={r.rx} fill={colorMap[r.key]} />
      ))}
      {RINGS.map((r) => (
        <rect key={`s-${r.key}`}
          x={r.x + 10} y={r.y + 10} width={r.w - 20} height={r.h - 20} rx={r.rx - 2}
          fill="none"
          stroke="black" strokeOpacity="0.07" strokeWidth="1.5" strokeDasharray="10,7"
        />
      ))}

      <rect x="14" y="14" width="372" height="372" rx="18" fill={`url(#${pid}-dots)`} />
    </>
  );
}
