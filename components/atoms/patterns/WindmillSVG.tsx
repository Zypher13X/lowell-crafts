import WindmillInner from "./WindmillInner";

interface Props {
  colors: Record<string, string>;
  svgId?: string;
}

export default function WindmillSVG({ colors, svgId }: Props) {
  const pid = svgId ?? "windmill-default";
  return (
    <svg
      id={svgId}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      aria-label="Windmill granny square color preview"
      role="img"
    >
      <WindmillInner colors={colors} pid={pid} />
    </svg>
  );
}
