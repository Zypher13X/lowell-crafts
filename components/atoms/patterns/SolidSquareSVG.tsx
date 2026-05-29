import SolidSquareInner from "./SolidSquareInner";

interface Props {
  colors: Record<string, string>;
  svgId?: string;
}

export default function SolidSquareSVG({ colors, svgId }: Props) {
  const pid = svgId ?? "solid-default";
  return (
    <svg
      id={svgId}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      aria-label="Solid granny square color preview"
      role="img"
    >
      <SolidSquareInner colors={colors} pid={pid} />
    </svg>
  );
}
