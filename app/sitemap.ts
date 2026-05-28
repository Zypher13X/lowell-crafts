import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/queries";

export const dynamic = "force-static";

const BASE = "https://zypher13x.github.io/lowell-crafts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllSlugs();

  const productPages = slugs.map((slug) => ({
    url: `${BASE}/shop/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    { url: BASE, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/contact`, changeFrequency: "monthly", priority: 0.5 },
    ...productPages,
  ];
}
