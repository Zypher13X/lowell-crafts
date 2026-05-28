interface Props {
  colors: Record<string, string>;
  svgId?: string;
}

function hexPts(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = ((i * 60 - 30) * Math.PI) / 180;
    return `${+(cx + r * Math.cos(a)).toFixed(1)},${+(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
}

// 6 surrounding scale centers at distance 84 from shell center
const SHELL_CX = 200;
const SHELL_CY = 205;
const SCALE_DIST = 84;
const SURROUNDING = Array.from({ length: 6 }, (_, i) => {
  const a = (i * 60 * Math.PI) / 180;
  return {
    cx: +(SHELL_CX + SCALE_DIST * Math.cos(a)).toFixed(1),
    cy: +(SHELL_CY + SCALE_DIST * Math.sin(a)).toFixed(1),
  };
});

export default function TurtleSVG({ colors, svgId }: Props) {
  const {
    body    = "#7A9E7E",
    shell   = "#9E4B28",
    pattern = "#D4A830",
  } = colors;

  const pid = svgId ?? "turtle-default";

  return (
    <svg
      id={svgId}
      viewBox="0 0 400 380"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      aria-label="Turtle amigurumi color preview"
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
        <clipPath id={`${pid}-shell-clip`}>
          <ellipse cx={SHELL_CX} cy={SHELL_CY} rx="134" ry="118" />
        </clipPath>
      </defs>

      {/* ── Drop shadow ─────────────────────────────────── */}
      <ellipse cx="200" cy="370" rx="148" ry="10" fill="black" fillOpacity="0.07" />

      {/* ── Body (drawn first — legs + head + tail poke out) */}
      <ellipse cx="200" cy="210" rx="170" ry="152" fill={body} />

      {/* Head */}
      <ellipse cx="200" cy="56" rx="28" ry="26" fill={body} />
      {/* Neck connecting head to body */}
      <rect x="184" y="52" width="32" height="30" rx="8" fill={body} />

      {/* Front legs */}
      <ellipse cx="52" cy="134" rx="30" ry="17" fill={body} transform="rotate(-38 52 134)" />
      <ellipse cx="348" cy="134" rx="30" ry="17" fill={body} transform="rotate(38 348 134)" />

      {/* Back legs */}
      <ellipse cx="68" cy="288" rx="30" ry="17" fill={body} transform="rotate(34 68 288)" />
      <ellipse cx="332" cy="288" rx="30" ry="17" fill={body} transform="rotate(-34 332 288)" />

      {/* Tail */}
      <ellipse cx="200" cy="358" rx="11" ry="16" fill={body} />

      {/* Body texture */}
      <ellipse cx="200" cy="210" rx="170" ry="152" fill={`url(#${pid}-dots)`} />

      {/* ── Shell base ──────────────────────────────────── */}
      <ellipse cx={SHELL_CX} cy={SHELL_CY} rx="134" ry="118" fill={shell} />

      {/* ── Hexagonal scale pattern ─────────────────────── */}
      {/* Center scale */}
      <polygon points={hexPts(SHELL_CX, SHELL_CY, 40)} fill={pattern} />

      {/* 6 surrounding scales */}
      {SURROUNDING.map(({ cx, cy }, i) => (
        <polygon key={i} points={hexPts(cx, cy, 37)} fill={pattern} />
      ))}

      {/* Shell texture overlay */}
      <ellipse cx={SHELL_CX} cy={SHELL_CY} rx="134" ry="118" fill={`url(#${pid}-dots)`} />

      {/* Shell edge highlight */}
      <ellipse
        cx={SHELL_CX} cy={SHELL_CY} rx="134" ry="118"
        fill="none" stroke="black" strokeOpacity="0.07" strokeWidth="3"
      />

      {/* ── Eyes ────────────────────────────────────────── */}
      <circle cx="191" cy="50" r="4" fill="black" fillOpacity="0.5" />
      <circle cx="209" cy="50" r="4" fill="black" fillOpacity="0.5" />
      {/* Eye shine */}
      <circle cx="193" cy="48" r="1.5" fill="white" fillOpacity="0.7" />
      <circle cx="211" cy="48" r="1.5" fill="white" fillOpacity="0.7" />
    </svg>
  );
}
