import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCraftBySlug, getAllSlugs } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import Badge from "@/components/atoms/Badge";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  // Static export requires at least one pre-rendered route; the placeholder
  // hits notFound() at request time when no real products exist yet.
  if (slugs.length === 0) return [{ slug: "_" }];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const craft = await getCraftBySlug(slug);
  if (!craft) return { title: "Not Found — Lowell Crafts" };
  return {
    title: `${craft.title} — Lowell Crafts`,
    description: craft.description,
    openGraph: {
      title: craft.title,
      description: craft.description,
      images: craft.image ? [{ url: urlFor(craft.image).width(1200).url() }] : [],
    },
  };
}

export default async function CraftDetailPage({ params }: Props) {
  const { slug } = await params;
  const craft = await getCraftBySlug(slug);
  if (!craft) notFound();

  const imageSrc = craft.image ? urlFor(craft.image).width(1200).auto("format").url() : null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: craft.title,
    description: craft.description,
    offers: {
      "@type": "Offer",
      price: craft.price,
      priceCurrency: "USD",
      availability: craft.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    ...(imageSrc && { image: imageSrc }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-body"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
              clipRule="evenodd"
            />
          </svg>
          Back to shop
        </Link>

        <div className="mt-8 grid gap-10 sm:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-lg border border-default bg-[var(--color-border)]">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={craft.imageAlt ?? craft.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-7xl text-subtle">◇</span>
              </div>
            )}
            {!craft.inStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <span className="rounded bg-black/70 px-3 py-1 text-xs font-medium uppercase tracking-widest text-white">
                  Sold Out
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <Badge category={craft.category} />
            <h1 className="font-serif text-3xl text-body">{craft.title}</h1>
            <p className="text-2xl font-medium text-body">${craft.price}</p>
            <p className="leading-relaxed text-muted">{craft.description}</p>

            <div className="mt-4 space-y-3">
              <Link
                href="/contact"
                className={`block w-full rounded-md px-6 py-3 text-center text-sm font-medium transition-opacity hover:opacity-90 ${
                  craft.inStock
                    ? "bg-accent text-on-accent"
                    : "cursor-not-allowed bg-[var(--color-border)] text-subtle"
                }`}
                aria-disabled={!craft.inStock}
              >
                {craft.inStock ? "Inquire to Order" : "Out of Stock"}
              </Link>
              <p className="text-center text-xs text-subtle">
                Each piece is made to order — contact me to get started.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
