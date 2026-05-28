import { client } from "./sanity";
import type { SanityImageRef } from "./sanity";

export type Category = "wearables" | "home" | "amigurumi" | "accessories";

export interface SanityCraft {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: Category;
  price: number;
  inStock: boolean;
  image?: SanityImageRef;
  imageAlt?: string;
}

const CRAFT_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  description,
  category,
  price,
  inStock,
  image,
  imageAlt
`;

export async function getCrafts(): Promise<SanityCraft[]> {
  try {
    return await client.fetch(
      `*[_type == "craft"] | order(_createdAt asc) { ${CRAFT_FIELDS} }`
    );
  } catch (err) {
    console.error("Failed to fetch crafts from Sanity:", err);
    return [];
  }
}

export async function getCraftBySlug(slug: string): Promise<SanityCraft | null> {
  try {
    const result = await client.fetch(
      `*[_type == "craft" && slug.current == $slug][0] { ${CRAFT_FIELDS} }`,
      { slug }
    );
    return result ?? null;
  } catch (err) {
    console.error("Failed to fetch craft by slug:", err);
    return null;
  }
}

export async function getAllSlugs(): Promise<string[]> {
  try {
    const results: { slug: string }[] = await client.fetch(
      `*[_type == "craft" && defined(slug.current)] { "slug": slug.current }`
    );
    return results.map((r) => r.slug);
  } catch {
    return [];
  }
}
