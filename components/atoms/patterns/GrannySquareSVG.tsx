import GrannySquareInner from "./GrannySquareInner";

interface Props {
  colors: Record<string, string>;
  svgId?: string;
}

export default function GrannySquareSVG({ colors, svgId }: Props) {
  const pid = svgId ?? "gs-default";
  return (
    <svg
      id={svgId}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      aria-label="Granny square color preview"
      role="img"
    >
      <GrannySquareInner colors={colors} pid={pid} />
    </svg>
  );
}
