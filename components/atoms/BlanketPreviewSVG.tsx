import type { BlanketVariant } from "@/lib/blanket";
import { ARRANGEMENTS } from "@/lib/blanket";
import GrannySquareInner from "@/components/atoms/patterns/GrannySquareInner";
import SolidSquareInner from "@/components/atoms/patterns/SolidSquareInner";
import SunflowerInner from "@/components/atoms/patterns/SunflowerInner";
import StripedSquareInner from "@/components/atoms/patterns/StripedSquareInner";
import MiteredSquareInner from "@/components/atoms/patterns/MiteredSquareInner";
import WindmillInner from "@/components/atoms/patterns/WindmillInner";

type InnerComponent = React.ComponentType<{ colors: Record<string, string>; pid: string }>;

const INNER_MAP: Record<string, InnerComponent> = {
  granny:    GrannySquareInner,
  solid:     SolidSquareInner,
  sunflower: SunflowerInner,
  striped:   StripedSquareInner,
  mitered:   MiteredSquareInner,
  windmill:  WindmillInner,
};

interface Props {
  variants: BlanketVariant[];
  rows: number;
  cols: number;
  arrangementId: string;
  svgId?: string;
}

const TILE = 100;

export default function BlanketPreviewSVG({ variants, rows, cols, arrangementId, svgId }: Props) {
  const arrangement = ARRANGEMENTS.find((a) => a.id === arrangementId) ?? ARRANGEMENTS[0];

  return (
    <svg
      id={svgId}
      viewBox={`0 0 ${cols * TILE} ${rows * TILE}`}
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      aria-label={`Blanket preview: ${cols} wide by ${rows} tall`}
      role="img"
    >
      <defs>
        {variants.map((variant, i) => {
          const Inner = INNER_MAP[variant.patternId] ?? GrannySquareInner;
          return (
            <symbol key={i} id={`bsq-${i}`} viewBox="0 0 400 400">
              <Inner colors={variant.colors} pid={`bsq-${i}`} />
            </symbol>
          );
        })}
      </defs>

      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => {
          const vi = arrangement.fn(r, c, rows, cols, variants.length);
          return (
            <use
              key={`${r}-${c}`}
              href={`#bsq-${vi % variants.length}`}
              x={c * TILE}
              y={r * TILE}
              width={TILE}
              height={TILE}
            />
          );
        })
      )}
    </svg>
  );
}
