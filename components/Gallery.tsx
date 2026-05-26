"use client";

import { useState } from "react";
import type { SanityCraft, Category } from "@/lib/queries";
import CraftCard from "./CraftCard";

const FILTERS: { label: string; value: Category | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Wearables", value: "wearables" },
  { label: "Home", value: "home" },
  { label: "Amigurumi", value: "amigurumi" },
  { label: "Accessories", value: "accessories" },
];

export default function Gallery({ crafts }: { crafts: SanityCraft[] }) {
  const [active, setActive] = useState<Category | "all">("all");

  const filtered = active === "all" ? crafts : crafts.filter((c) => c.category === active);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-all duration-200 ${
              active === f.value
                ? "border-stone-800 bg-stone-800 text-stone-50"
                : "border-stone-200 bg-white text-stone-600 hover:border-stone-400 hover:text-stone-800"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div key={active} className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {filtered.map((craft, i) => (
          <div key={craft._id} className="mb-6 break-inside-avoid">
            <CraftCard craft={craft} index={i} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-20 text-center text-stone-400">No items in this category yet.</p>
      )}
    </div>
  );
}
