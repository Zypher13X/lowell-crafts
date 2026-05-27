import Image from "next/image";
import type { SanityCraft } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";

const CATEGORY_COLORS: Record<string, string> = {
  wearables:   "bg-rose-100 text-rose-800",
  home:        "bg-amber-100 text-amber-800",
  amigurumi:   "bg-sky-100 text-sky-800",
  accessories: "bg-emerald-100 text-emerald-800",
};

const ASPECT_RATIOS = ["aspect-square", "aspect-[4/5]", "aspect-[3/4]"];

interface Props {
  craft: SanityCraft;
  index: number;
}

export default function CraftCard({ craft, index }: Props) {
  const aspectRatio = ASPECT_RATIOS[index % ASPECT_RATIOS.length];
  const imageSrc = craft.image ? urlFor(craft.image).width(800).url() : null;

  return (
    <article
      className="card-enter group flex flex-col overflow-hidden rounded-lg border border-default bg-surface transition-all duration-300 hover:-translate-y-1 hover:rotate-[0.4deg] hover:shadow-lg"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className={`relative ${aspectRatio} bg-[var(--color-border)] opacity-80`}>
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
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span
          className={`w-fit rounded-full px-2 py-0.5 text-xs font-medium capitalize ${CATEGORY_COLORS[craft.category] ?? "bg-[var(--color-border)] text-muted"}`}
        >
          {craft.category}
        </span>
        <h3 className="font-serif text-lg text-body">{craft.title}</h3>
        <p className="flex-1 text-sm leading-relaxed text-muted">{craft.description}</p>
        <p className="mt-2 font-medium text-body">${craft.price}</p>
      </div>
    </article>
  );
}
