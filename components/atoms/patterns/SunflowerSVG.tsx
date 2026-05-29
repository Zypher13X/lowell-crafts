import SunflowerInner from "./SunflowerInner";

interface Props {
  colors: Record<string, string>;
  svgId?: string;
}

export default function SunflowerSVG({ colors, svgId }: Props) {
  const pid = svgId ?? "sunflower-default";
  return (
    <svg
      id={svgId}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      aria-label="Sunflower granny square color preview"
      role="img"
    >
      <SunflowerInner colors={colors} pid={pid} />
    </svg>
  );
}
