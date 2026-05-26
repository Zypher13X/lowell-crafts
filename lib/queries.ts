import { client } from "./sanity";

export type Category = "ceramics" | "textiles" | "woodwork" | "jewelry" | "paper";

export interface SanityCraft {
  _id: string;
  title: string;
  description: string;
  category: Category;
  price: number;
  inStock: boolean;
  // Sanity image reference — pass to urlFor() to get a URL
  image?: { asset: { _ref: string }; hotspot?: unknown };
  imageAlt?: string;
}

export async function getCrafts(): Promise<SanityCraft[]> {
  return client.fetch(
    `*[_type == "craft"] | order(_createdAt asc) {
      _id,
      title,
      description,
      category,
      price,
      inStock,
      image,
      imageAlt
    }`
  );
}
