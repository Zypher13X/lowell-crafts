import Image from "next/image";
import type { Craft } from "@/data/crafts";

const CATEGORY_COLORS: Record<string, string> = {
  ceramics: "bg-amber-100 text-amber-800",
  textiles: "bg-emerald-100 text-emerald-800",
  woodwork: "bg-orange-100 text-orange-800",
  jewelry: "bg-rose-100 text-rose-800",
  paper: "bg-sky-100 text-sky-800",
};

// Vary image aspect ratio to create masonry rhythm
const ASPECT_RATIOS = ["aspect-square", "aspect-[4/5]", "aspect-[3/4]"];

interface Props {
  craft: Craft;
  index: number;
}

export default function CraftCard({ craft, index }: Props) {
  const aspectRatio = ASPECT_RATIOS[index % ASPECT_RATIOS.length];

  return (
    <article
      className="card-enter group flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:rotate-[0.4deg] hover:shadow-lg"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className={`relative ${aspectRatio} bg-stone-100`}>
        {craft.imageSrc ? (
          <Image
            src={craft.imageSrc}
            alt={craft.imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-5xl text-stone-200 transition-transform duration-300 group-hover:scale-110">◇</span>
          </div>
        )}
        {!craft.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-stone-900/40">
            <span className="rounded bg-stone-900/80 px-3 py-1 text-xs font-medium uppercase tracking-widest text-stone-100">
              Sold Out
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span
          className={`w-fit rounded-full px-2 py-0.5 text-xs font-medium capitalize ${CATEGORY_COLORS[craft.category] ?? "bg-stone-100 text-stone-600"}`}
        >
          {craft.category}
        </span>
        <h3 className="font-serif text-lg text-stone-800">{craft.title}</h3>
        <p className="flex-1 text-sm leading-relaxed text-stone-500">{craft.description}</p>
        <p className="mt-2 font-medium text-stone-700">${craft.price}</p>
      </div>
    </article>
  );
}
