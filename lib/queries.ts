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
  quantity?: number | null;
  image?: SanityImageRef;
  imageAlt?: string;
  images?: Array<SanityImageRef & { alt?: string }>;
}

const CRAFT_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  description,
  category,
  price,
  inStock,
  quantity,
  image,
  imageAlt,
  images[] { ..., alt }
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

export async function getRelatedCrafts(
  category: Category,
  excludeId: string
): Promise<SanityCraft[]> {
  try {
    return await client.fetch(
      `*[_type == "craft" && category == $category && _id != $excludeId] | order(_createdAt desc)[0...4] { ${CRAFT_FIELDS} }`,
      { category, excludeId }
    );
  } catch {
    return [];
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
