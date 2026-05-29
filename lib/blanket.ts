import { PATTERNS } from "@/lib/patterns";
import type { ColorMap } from "@/lib/patterns";

export interface BlanketVariant {
  patternId: string;
  colors: ColorMap;
}

export interface BlanketConfig {
  variants: BlanketVariant[];
  rows: number;
  cols: number;
  arrangementId: string;
}

// Width:height = 3:4, so cols = rows * 3/4, rounded to nearest even number
export function autoColsForRows(rows: number): number {
  return Math.max(2, Math.round((rows * 3) / 8) * 2);
}

export function getGrannyPatterns() {
  return PATTERNS.filter((p) => p.groupId === "granny");
}

export function buildDefaultVariant(patternId: string): BlanketVariant {
  const pattern = PATTERNS.find((p) => p.id === patternId)!;
  return {
    patternId,
    colors: Object.fromEntries(pattern.regions.map((r) => [r.id, r.defaultColor])),
  };
}

export interface BlanketPreset {
  id: string;
  label: string;
  rows: number;
}

export const BLANKET_PRESETS: BlanketPreset[] = [
  { id: "baby",    label: "Baby",    rows: 6  },
  { id: "lapghan", label: "Lapghan", rows: 10 },
  { id: "throw",   label: "Throw",   rows: 12 },
  { id: "full",    label: "Full",    rows: 16 },
  { id: "king",    label: "King",    rows: 20 },
  { id: "custom",  label: "Custom",  rows: 0  },
];

export interface ArrangementDef {
  id: string;
  label: string;
  minVariants: number;
  // When set, the arrangement uses exactly this many variants; more are ignored
  maxVariants?: number;
  fn: (row: number, col: number, rows: number, cols: number, count: number) => number;
}

export const ARRANGEMENTS: ArrangementDef[] = [
  {
    id: "solid",
    label: "Solid",
    minVariants: 1,
    maxVariants: 1,
    fn: () => 0,
  },
  {
    id: "checkerboard",
    label: "Checkerboard",
    minVariants: 2,
    maxVariants: 2,
    fn: (row, col) => (row + col) % 2,
  },
  {
    id: "row-stripes",
    label: "Row Stripes",
    minVariants: 2,
    fn: (row, _c, _r, _cols, count) => row % count,
  },
  {
    id: "col-stripes",
    label: "Column Stripes",
    minVariants: 2,
    fn: (_r, col, _rows, _c, count) => col % count,
  },
  {
    id: "diagonal",
    label: "Diagonal",
    minVariants: 2,
    fn: (row, col, _r, _c, count) => (row + col) % count,
  },
  {
    id: "pinwheel",
    label: "Pinwheel",
    minVariants: 2,
    maxVariants: 4,
    fn: (row, col, rows, cols, count) => {
      const q = (row < rows / 2 ? 0 : 2) + (col < cols / 2 ? 0 : 1);
      return q % count;
    },
  },
  {
    id: "brick",
    label: "Brick Offset",
    minVariants: 2,
    fn: (row, col, _r, cols, count) =>
      (col + (row % 2 === 0 ? 0 : Math.floor(cols / 2))) % count,
  },
];
