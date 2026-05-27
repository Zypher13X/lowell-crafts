import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

if (!projectId) {
  throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is not set");
}

export const client = createClient({ projectId, dataset, apiVersion: "2024-01-01", useCdn: true });

const builder = createImageUrlBuilder(client as Parameters<typeof createImageUrlBuilder>[0]);

export type SanityImageRef = { asset: { _ref: string }; hotspot?: unknown };

export function urlFor(source: SanityImageRef) {
  return builder.image(source);
}
