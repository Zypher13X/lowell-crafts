import MiteredSquareInner from "./MiteredSquareInner";

interface Props {
  colors: Record<string, string>;
  svgId?: string;
}

export default function MiteredSquareSVG({ colors, svgId }: Props) {
  const pid = svgId ?? "mitered-default";
  return (
    <svg
      id={svgId}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      aria-label="Mitered granny square color preview"
      role="img"
    >
      <MiteredSquareInner colors={colors} pid={pid} />
    </svg>
  );
}
