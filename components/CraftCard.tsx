import Image from "next/image";
import type { Craft } from "@/data/crafts";

const CATEGORY_COLORS: Record<string, string> = {
  ceramics: "bg-amber-100 text-amber-800",
  textiles: "bg-emerald-100 text-emerald-800",
  woodwork: "bg-orange-100 text-orange-800",
  jewelry: "bg-rose-100 text-rose-800",
  paper: "bg-sky-100 text-sky-800",
};

export default function CraftCard({ craft }: { craft: Craft }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white transition-shadow hover:shadow-md">
      <div className="relative aspect-square bg-stone-100">
        {craft.imageSrc ? (
          <Image
            src={craft.imageSrc}
            alt={craft.imageAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-4xl text-stone-300">◇</span>
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
