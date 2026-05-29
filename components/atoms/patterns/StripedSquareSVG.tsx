import StripedSquareInner from "./StripedSquareInner";

interface Props {
  colors: Record<string, string>;
  svgId?: string;
}

export default function StripedSquareSVG({ colors, svgId }: Props) {
  const pid = svgId ?? "striped-default";
  return (
    <svg
      id={svgId}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      aria-label="Striped granny square color preview"
      role="img"
    >
      <StripedSquareInner colors={colors} pid={pid} />
    </svg>
  );
}
