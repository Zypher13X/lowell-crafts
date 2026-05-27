import { client } from "./sanity";
import type { SanityImageRef } from "./sanity";

export type Category = "wearables" | "home" | "amigurumi" | "accessories";

export interface SanityCraft {
  _id: string;
  title: string;
  description: string;
  category: Category;
  price: number;
  inStock: boolean;
  image?: SanityImageRef;
  imageAlt?: string;
}

export async function getCrafts(): Promise<SanityCraft[]> {
  try {
    return await client.fetch(
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
  } catch (err) {
    console.error("Failed to fetch crafts from Sanity:", err);
    return [];
  }
}
