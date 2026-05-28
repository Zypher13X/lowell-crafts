export const YARN_COLORS = [
  { name: "Snow",       hex: "#FAFAF8" },
  { name: "Cream",      hex: "#F5EDD8" },
  { name: "Oatmeal",    hex: "#DDD0BC" },
  { name: "Sand",       hex: "#C8A878" },
  { name: "Terracotta", hex: "#C96B4A" },
  { name: "Rust",       hex: "#9E4B28" },
  { name: "Cranberry",  hex: "#982040" },
  { name: "Rose",       hex: "#D4878A" },
  { name: "Mustard",    hex: "#D4A830" },
  { name: "Sage",       hex: "#7A9E7E" },
  { name: "Forest",     hex: "#3A6B45" },
  { name: "Sky",        hex: "#7AB8D8" },
  { name: "Denim",      hex: "#4A7AA0" },
  { name: "Lavender",   hex: "#9888C8" },
  { name: "Charcoal",   hex: "#484848" },
  { name: "Slate",      hex: "#6A7A8A" },
] as const;

export type YarnColor = (typeof YARN_COLORS)[number];

export interface PatternRegion {
  id: string;
  label: string;
  defaultColor: string;
}

export interface PatternDef {
  id: string;
  label: string;
  description: string;
  regions: PatternRegion[];
}

export const PATTERNS: PatternDef[] = [
  {
    id: "granny",
    label: "Granny Square",
    description:
      "The classic four-round motif. Mix bold contrasts or keep it tonal — every combo works.",
    regions: [
      { id: "center", label: "Center",      defaultColor: "#D4A830" },
      { id: "inner",  label: "Inner Round", defaultColor: "#7A9E7E" },
      { id: "outer",  label: "Outer Round", defaultColor: "#C96B4A" },
      { id: "border", label: "Border",      defaultColor: "#3A6B45" },
    ],
  },
];

export type ColorMap = Record<string, string>;
export type PatternColors = Record<string, ColorMap>;

export function buildDefaultColors(): PatternColors {
  return Object.fromEntries(
    PATTERNS.map((p) => [
      p.id,
      Object.fromEntries(p.regions.map((r) => [r.id, r.defaultColor])),
    ])
  );
}

export function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? "#1c1917" : "#fafaf9";
}
