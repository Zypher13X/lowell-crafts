interface Props {
  colors: Record<string, string>;
  svgId?: string;
}

export default function TurtleSVG({ colors, svgId }: Props) {
  const {
    shell    = "#7A9E7E",
    flippers = "#DDD0BC",
    body     = "#C8A878",
  } = colors;

  const pid = svgId ?? "turtle-default";

  return (
    <svg
      id={svgId}
      viewBox="0 0 400 420"
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
        {/* Radial highlight to give the shell a dome feel */}
        <radialGradient id={`${pid}-dome`} cx="42%" cy="38%" r="55%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.18" />
          <stop offset="100%" stopColor="black" stopOpacity="0.08" />
        </radialGradient>
      </defs>

      {/* ── Drop shadow ─────────────────────────────────── */}
      <ellipse cx="200" cy="408" rx="158" ry="10" fill="black" fillOpacity="0.07" />

      {/* ── Body base (shows around shell edges) ────────── */}
      <ellipse cx="200" cy="218" rx="148" ry="130" fill={body} />
      <ellipse cx="200" cy="218" rx="148" ry="130" fill={`url(#${pid}-dots)`} />

      {/* ── Front flippers ──────────────────────────────── */}
      {/* Front-left — wide paddle angled up-left */}
      <ellipse
        cx="75" cy="118"
        rx="40" ry="78"
        fill={flippers}
        transform="rotate(-42 75 118)"
      />
      <ellipse
        cx="75" cy="118"
        rx="40" ry="78"
        fill={`url(#${pid}-dots)`}
        transform="rotate(-42 75 118)"
      />
      {/* Front-right */}
      <ellipse
        cx="325" cy="118"
        rx="40" ry="78"
        fill={flippers}
        transform="rotate(42 325 118)"
      />
      <ellipse
        cx="325" cy="118"
        rx="40" ry="78"
        fill={`url(#${pid}-dots)`}
        transform="rotate(42 325 118)"
      />

      {/* ── Back flippers — shorter, angled downward ─────── */}
      {/* Back-left */}
      <ellipse
        cx="84" cy="308"
        rx="34" ry="62"
        fill={flippers}
        transform="rotate(32 84 308)"
      />
      <ellipse
        cx="84" cy="308"
        rx="34" ry="62"
        fill={`url(#${pid}-dots)`}
        transform="rotate(32 84 308)"
      />
      {/* Back-right */}
      <ellipse
        cx="316" cy="308"
        rx="34" ry="62"
        fill={flippers}
        transform="rotate(-32 316 308)"
      />
      <ellipse
        cx="316" cy="308"
        rx="34" ry="62"
        fill={`url(#${pid}-dots)`}
        transform="rotate(-32 316 308)"
      />

      {/* ── Shell dome (sits on top of body/flippers) ─────── */}
      <ellipse cx="200" cy="210" rx="132" ry="118" fill={shell} />
      {/* Dome highlight + depth */}
      <ellipse cx="200" cy="210" rx="132" ry="118" fill={`url(#${pid}-dome)`} />
      <ellipse cx="200" cy="210" rx="132" ry="118" fill={`url(#${pid}-dots)`} />
      {/* Shell edge */}
      <ellipse
        cx="200" cy="210" rx="132" ry="118"
        fill="none" stroke="black" strokeOpacity="0.08" strokeWidth="2.5"
      />

      {/* ── Head ────────────────────────────────────────── */}
      {/* Neck connecting head to shell front */}
      <ellipse cx="200" cy="90" rx="22" ry="16" fill={body} />
      {/* Round prominent head */}
      <ellipse cx="200" cy="60" rx="34" ry="31" fill={body} />
      <ellipse cx="200" cy="60" rx="34" ry="31" fill={`url(#${pid}-dots)`} />

      {/* ── Tail ────────────────────────────────────────── */}
      <ellipse cx="200" cy="362" rx="13" ry="20" fill={body} />
      <ellipse cx="200" cy="362" rx="13" ry="20" fill={`url(#${pid}-dots)`} />

      {/* ── Eyes ────────────────────────────────────────── */}
      <circle cx="188" cy="53" r="5.5" fill="black" fillOpacity="0.55" />
      <circle cx="212" cy="53" r="5.5" fill="black" fillOpacity="0.55" />
      {/* Shine */}
      <circle cx="190" cy="51" r="2"   fill="white" fillOpacity="0.75" />
      <circle cx="214" cy="51" r="2"   fill="white" fillOpacity="0.75" />
    </svg>
  );
}
