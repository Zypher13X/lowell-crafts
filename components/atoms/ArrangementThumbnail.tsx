import type { ArrangementDef } from "@/lib/blanket";

interface Props {
  arrangement: ArrangementDef;
  variantCount: number;
  paletteColors: string[];
}

const COLS = 6;
const ROWS = 8;
const CELL = 8;

export default function ArrangementThumbnail({ arrangement, variantCount, paletteColors }: Props) {
  return (
    <svg
      viewBox={`0 0 ${COLS * CELL} ${ROWS * CELL}`}
      className="w-full"
      aria-hidden="true"
    >
      {Array.from({ length: ROWS }, (_, r) =>
        Array.from({ length: COLS }, (_, c) => {
          const vi = arrangement.fn(r, c, ROWS, COLS, variantCount);
          return (
            <rect
              key={`${r}-${c}`}
              x={c * CELL}
              y={r * CELL}
              width={CELL}
              height={CELL}
              fill={paletteColors[vi % paletteColors.length] ?? "#ccc"}
            />
          );
        })
      )}
    </svg>
  );
}
