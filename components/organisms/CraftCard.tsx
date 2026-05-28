import Image from "next/image";
import Link from "next/link";
import type { SanityCraft } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import Badge from "@/components/atoms/Badge";
import FavoriteButton from "@/components/atoms/FavoriteButton";

const ASPECT_RATIOS = ["aspect-square", "aspect-[4/5]", "aspect-[3/4]"];

interface Props {
  craft: SanityCraft;
  index: number;
  isFavorited?: boolean;
  onFavoriteToggle?: () => void;
}

export default function CraftCard({ craft, index, isFavorited = false, onFavoriteToggle }: Props) {
  const aspectRatio = ASPECT_RATIOS[index % ASPECT_RATIOS.length];
  const imageSrc = craft.image ? urlFor(craft.image).width(800).auto("format").url() : null;
  const href = craft.slug ? `/shop/${craft.slug}` : "#";

  return (
    <article
      className="card-enter group flex flex-col overflow-hidden rounded-lg border border-default bg-surface transition-all duration-300 hover:-translate-y-1 hover:rotate-[0.4deg] hover:shadow-lg"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <Link href={href} className={`relative ${aspectRatio} bg-[var(--color-border)] opacity-80`} tabIndex={0}>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={craft.imageAlt ?? craft.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl text-subtle transition-transform duration-300 group-hover:scale-110">
              ◇
            </span>
          </div>
        )}
        {!craft.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded bg-black/70 px-3 py-1 text-xs font-medium uppercase tracking-widest text-white">
              Sold Out
            </span>
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <Badge category={craft.category} />
          {onFavoriteToggle && (
            <FavoriteButton
              isFavorited={isFavorited}
              onToggle={onFavoriteToggle}
              label={isFavorited ? `Remove ${craft.title} from favorites` : `Save ${craft.title} to favorites`}
            />
          )}
        </div>
        <Link href={href}>
          <h3 className="font-serif text-lg text-body hover:underline">{craft.title}</h3>
        </Link>
        <p className="flex-1 text-sm leading-relaxed text-muted">{craft.description}</p>
        <p className="mt-2 font-medium text-body">${craft.price}</p>
      </div>
    </article>
  );
}
