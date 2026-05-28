interface Props {
  colors: Record<string, string>;
  svgId?: string;
}

export default function TurtleSVG({ colors, svgId }: Props) {
  const {
    body     = "#7A9E7E",
    flippers = "#DDD0BC",
    head     = "#C8A878",
  } = colors;

  const pid = svgId ?? "turtle-default";

  return (
    <svg
      id={svgId}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      aria-label="Turtle amigurumi color preview"
      role="img"
    >
      <defs>
        <pattern
          id={`${pid}-dots`}
          x="0" y="0" width="10" height="10"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="5" cy="5" r="1.4" fill="black" fillOpacity="0.06" />
        </pattern>
      </defs>

      {/* ── Drop shadow ─────────────────────────────────── */}
      <ellipse cx="200" cy="392" rx="150" ry="9" fill="black" fillOpacity="0.07" />

      {/* ── Flippers drawn first so body covers their roots ── */}
      {/* Front-left */}
      <ellipse cx="75"  cy="118" rx="40" ry="78" fill={flippers} transform="rotate(-42 75 118)" />
      <ellipse cx="75"  cy="118" rx="40" ry="78" fill={`url(#${pid}-dots)`} transform="rotate(-42 75 118)" />
      {/* Front-right */}
      <ellipse cx="325" cy="118" rx="40" ry="78" fill={flippers} transform="rotate(42 325 118)" />
      <ellipse cx="325" cy="118" rx="40" ry="78" fill={`url(#${pid}-dots)`} transform="rotate(42 325 118)" />
      {/* Back-left */}
      <ellipse cx="84"  cy="305" rx="34" ry="62" fill={flippers} transform="rotate(32 84 305)" />
      <ellipse cx="84"  cy="305" rx="34" ry="62" fill={`url(#${pid}-dots)`} transform="rotate(32 84 305)" />
      {/* Back-right */}
      <ellipse cx="316" cy="305" rx="34" ry="62" fill={flippers} transform="rotate(-32 316 305)" />
      <ellipse cx="316" cy="305" rx="34" ry="62" fill={`url(#${pid}-dots)`} transform="rotate(-32 316 305)" />

      {/* ── Body ────────────────────────────────────────── */}
      <ellipse cx="200" cy="215" rx="148" ry="130" fill={body} />
      <ellipse cx="200" cy="215" rx="148" ry="130" fill={`url(#${pid}-dots)`} />

      {/* ── Head ────────────────────────────────────────── */}
      <ellipse cx="200" cy="90"  rx="22" ry="16" fill={head} />
      <ellipse cx="200" cy="60"  rx="34" ry="31" fill={head} />
      <ellipse cx="200" cy="60"  rx="34" ry="31" fill={`url(#${pid}-dots)`} />

      {/* ── Eyes ────────────────────────────────────────── */}
      <circle cx="188" cy="53" r="5.5" fill="black" fillOpacity="0.55" />
      <circle cx="212" cy="53" r="5.5" fill="black" fillOpacity="0.55" />
      <circle cx="190" cy="51" r="2"   fill="white" fillOpacity="0.75" />
      <circle cx="214" cy="51" r="2"   fill="white" fillOpacity="0.75" />
    </svg>
  );
}
