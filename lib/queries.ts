import { client } from "./sanity";

export interface SanityCraft {
  _id: string;
  title: string;
  description: string;
  category: "ceramics" | "textiles" | "woodwork" | "jewelry" | "paper";
  price: number;
  inStock: boolean;
  image?: { asset: { _ref: string } };
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
