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

export const PATTERN_GROUPS = [
  { id: "granny", label: "Granny Square" },
  { id: "hat",    label: "Bucket Hat" },
  { id: "tote",   label: "Market Tote" },
  { id: "turtle", label: "Turtle" },
] as const;

export type GroupId = (typeof PATTERN_GROUPS)[number]["id"];

export interface PatternRegion {
  id: string;
  label: string;
  defaultColor: string;
}

export interface PatternDef {
  id: string;
  label: string;
  shortLabel: string;
  groupId: GroupId;
  description: string;
  regions: PatternRegion[];
}

export const PATTERNS: PatternDef[] = [
  // ── Granny Square variants ───────────────────────────────────
  {
    id: "granny",
    label: "Granny Square",
    shortLabel: "Classic",
    groupId: "granny",
    description:
      "The classic four-round motif. Mix bold contrasts or keep it tonal — every combo works.",
    regions: [
      { id: "center", label: "Center",      defaultColor: "#D4A830" },
      { id: "inner",  label: "Inner Round", defaultColor: "#7A9E7E" },
      { id: "outer",  label: "Outer Round", defaultColor: "#C96B4A" },
      { id: "border", label: "Border",      defaultColor: "#3A6B45" },
    ],
  },
  {
    id: "solid",
    label: "Solid Square",
    shortLabel: "Solid",
    groupId: "granny",
    description:
      "Three filled concentric squares with no open corners — clean, bold, and modern.",
    regions: [
      { id: "center", label: "Center", defaultColor: "#D4A830" },
      { id: "ring",   label: "Ring",   defaultColor: "#7A9E7E" },
      { id: "border", label: "Border", defaultColor: "#3A6B45" },
    ],
  },
  {
    id: "sunflower",
    label: "Sunflower",
    shortLabel: "Sunflower",
    groupId: "granny",
    description:
      "Eight rounded petals radiate from a central circle — inspired by the classic sunburst motif.",
    regions: [
      { id: "center", label: "Center", defaultColor: "#D4A830" },
      { id: "petals", label: "Petals", defaultColor: "#C96B4A" },
      { id: "border", label: "Border", defaultColor: "#3A6B45" },
    ],
  },
  {
    id: "striped",
    label: "Striped Square",
    shortLabel: "Striped",
    groupId: "granny",
    description:
      "Four independently colored concentric rings — great for experimenting with gradients.",
    regions: [
      { id: "ring1", label: "Center Ring",  defaultColor: "#D4A830" },
      { id: "ring2", label: "Second Ring",  defaultColor: "#7A9E7E" },
      { id: "ring3", label: "Third Ring",   defaultColor: "#C96B4A" },
      { id: "ring4", label: "Outer Border", defaultColor: "#3A6B45" },
    ],
  },
  {
    id: "mitered",
    label: "Mitered Square",
    shortLabel: "Mitered",
    groupId: "granny",
    description:
      "Two colors split diagonally across the square — simple geometry with striking contrast.",
    regions: [
      { id: "primary",   label: "Primary",   defaultColor: "#D4A830" },
      { id: "secondary", label: "Secondary", defaultColor: "#7A9E7E" },
      { id: "border",    label: "Border",    defaultColor: "#3A6B45" },
    ],
  },
  {
    id: "windmill",
    label: "Windmill",
    shortLabel: "Windmill",
    groupId: "granny",
    description:
      "Four alternating triangular blades meeting at a center hub — dynamic and graphic.",
    regions: [
      { id: "blade",     label: "Blades",      defaultColor: "#C96B4A" },
      { id: "alternate", label: "Alternating",  defaultColor: "#7A9E7E" },
      { id: "center",    label: "Hub",          defaultColor: "#D4A830" },
    ],
  },

  // ── Other patterns ───────────────────────────────────────────
  {
    id: "hat",
    label: "Bucket Hat",
    shortLabel: "Bucket Hat",
    groupId: "hat",
    description:
      "Crown, band, and brim. Try a tonal crown with a pop of color on the band.",
    regions: [
      { id: "crown", label: "Crown", defaultColor: "#DDD0BC" },
      { id: "band",  label: "Band",  defaultColor: "#C96B4A" },
      { id: "brim",  label: "Brim",  defaultColor: "#DDD0BC" },
    ],
  },
  {
    id: "tote",
    label: "Market Tote",
    shortLabel: "Market Tote",
    groupId: "tote",
    description:
      "A chunky cotton tote. Match handles to accent, or go full contrast.",
    regions: [
      { id: "body",    label: "Body",          defaultColor: "#F5EDD8" },
      { id: "handles", label: "Handles",       defaultColor: "#C96B4A" },
      { id: "accent",  label: "Accent Stripe", defaultColor: "#7A9E7E" },
    ],
  },
  {
    id: "turtle",
    label: "Turtle",
    shortLabel: "Turtle",
    groupId: "turtle",
    description:
      "An amigurumi sea turtle with a rounded dome shell and big paddle flippers. Color the shell, flippers, and body separately.",
    regions: [
      { id: "shell",    label: "Shell",    defaultColor: "#7A9E7E" },
      { id: "flippers", label: "Flippers", defaultColor: "#DDD0BC" },
      { id: "head",     label: "Head",     defaultColor: "#C8A878" },
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
