export type Category = "ceramics" | "textiles" | "woodwork" | "jewelry" | "paper";

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
    title: "Stoneware Mug",
    description: "Hand-thrown stoneware with a warm ash glaze. Holds 12oz and fits perfectly in your palm.",
    category: "ceramics",
    price: 38,
    inStock: true,
    imageAlt: "Stoneware mug with ash glaze",
  },
  {
    id: "2",
    title: "Linen Table Runner",
    description: "Naturally dyed with walnut and indigo in alternating bands. 14\" × 72\".",
    category: "textiles",
    price: 64,
    inStock: true,
    imageAlt: "Linen table runner with natural dye pattern",
  },
  {
    id: "3",
    title: "White Oak Cutting Board",
    description: "Edge-grain white oak with a food-safe oil finish. Each one is unique.",
    category: "woodwork",
    price: 85,
    inStock: true,
    imageAlt: "White oak cutting board with oil finish",
  },
  {
    id: "4",
    title: "Ceramic Bud Vase",
    description: "Pinch-formed with a matte terracotta slip. Perfect for a single stem.",
    category: "ceramics",
    price: 28,
    inStock: true,
    imageAlt: "Small ceramic bud vase in terracotta",
  },
  {
    id: "5",
    title: "Woven Wall Hanging",
    description: "Natural wool on a driftwood dowel. Earthy tones of cream, rust, and sage.",
    category: "textiles",
    price: 120,
    inStock: false,
    imageAlt: "Woven wall hanging in natural wool",
  },
  {
    id: "6",
    title: "Hand-Bound Journal",
    description: "Coptic-stitched with recycled paper and a reclaimed leather cover. 5\" × 7\".",
    category: "paper",
    price: 42,
    inStock: true,
    imageAlt: "Hand-bound journal with leather cover",
  },
];
