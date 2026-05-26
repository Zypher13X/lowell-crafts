export type Category = "wearables" | "home" | "amigurumi" | "accessories";

export interface Craft {
  id: string;
  title: string;
  description: string;
  category: Category;
  price: number;
  inStock: boolean;
  imageSrc?: string;
  imageAlt: string;
}

export const crafts: Craft[] = [
  {
    id: "1",
    title: "Chunky Ribbed Beanie",
    description: "Crocheted in a thick merino blend with a deep ribbed cuff. Slouchy fit, warm enough for real winters.",
    category: "wearables",
    price: 36,
    inStock: true,
    imageAlt: "Chunky ribbed crochet beanie in oatmeal",
  },
  {
    id: "2",
    title: "Throw Blanket",
    description: "A large-stitch throw in a neutral oatmeal and cream stripe. Cozy enough for the couch, pretty enough to display.",
    category: "home",
    price: 145,
    inStock: true,
    imageAlt: "Crocheted throw blanket in oatmeal and cream",
  },
  {
    id: "3",
    title: "Mini Bear Amigurumi",
    description: "A palm-sized stuffed bear with safety eyes and a hand-embroidered nose. Made with soft cotton yarn.",
    category: "amigurumi",
    price: 28,
    inStock: true,
    imageAlt: "Small crocheted bear amigurumi in brown",
  },
  {
    id: "4",
    title: "Market Tote",
    description: "Open-weave cotton tote with reinforced handles. Stretches to fit a full grocery run, folds flat when empty.",
    category: "accessories",
    price: 42,
    inStock: true,
    imageAlt: "Crocheted open-weave market tote bag",
  },
  {
    id: "5",
    title: "Textured Cowl",
    description: "An infinity-style cowl worked in a bobble stitch for extra warmth and texture. One size, very cozy.",
    category: "wearables",
    price: 54,
    inStock: false,
    imageAlt: "Crocheted bobble stitch cowl in sage green",
  },
  {
    id: "6",
    title: "Boho Plant Hanger Set",
    description: "A set of two macramé-style crochet plant hangers in natural cotton. Fits pots up to 6\".",
    category: "home",
    price: 38,
    inStock: true,
    imageAlt: "Crocheted plant hangers in natural cotton",
  },
];
