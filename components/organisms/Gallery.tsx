"use client";

import { useState, useMemo } from "react";
import type { SanityCraft, Category } from "@/lib/queries";
import CraftCard from "@/components/organisms/CraftCard";
import Dropdown from "@/components/molecules/Dropdown";
import { useFavorites } from "@/lib/useFavorites";

const FILTERS: { label: string; value: Category | "all" | "saved" }[] = [
  { label: "All", value: "all" },
  { label: "Wearables", value: "wearables" },
  { label: "Home", value: "home" },
  { label: "Amigurumi", value: "amigurumi" },
  { label: "Accessories", value: "accessories" },
  { label: "Saved", value: "saved" },
];

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
] as const satisfies readonly { label: string; value: string }[];

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export default function Gallery({ crafts }: { crafts: SanityCraft[] }) {
  const [active, setActive] = useState<Category | "all" | "saved">("all");
  const [sort, setSort] = useState<SortValue>("featured");
  const [search, setSearch] = useState("");
  const [animKey, setAnimKey] = useState(0);
  const { favorites, toggle, isFavorited } = useFavorites();

  function handleFilter(value: Category | "all" | "saved") {
    setAnimKey((k) => k + 1);
    setActive(value);
  }

  const filtered = useMemo(() => {
    let list = crafts;

    if (active === "saved") {
      list = list.filter((c) => favorites.has(c._id));
    } else if (active !== "all") {
      list = list.filter((c) => c.category === active);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
      );
    }

    if (sort === "price-asc") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [crafts, active, search, sort, favorites]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search pieces…"
            aria-label="Search crafts"
            className="rounded-full border border-default bg-surface py-1.5 pl-9 pr-4 text-sm text-body placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>

        <Dropdown
          options={SORT_OPTIONS}
          value={sort}
          onChange={setSort}
          triggerLabel="Sort by"
        />
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => handleFilter(f.value)}
            aria-pressed={active === f.value}
            className={`rounded-full border px-4 py-1.5 text-sm transition-all duration-200 ${
              active === f.value
                ? "border-[var(--color-accent)] bg-accent text-on-accent"
                : "border-default bg-surface text-muted hover:text-body"
            }`}
          >
            {f.label}
            {f.value === "saved" && favorites.size > 0 && (
              <span className="ml-1.5 rounded-full bg-current px-1.5 py-0.5 text-xs opacity-60">
                {favorites.size}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {filtered.map((craft, i) => (
          <div key={`${animKey}-${craft._id}`} className="mb-6 break-inside-avoid">
            <CraftCard
              craft={craft}
              index={i}
              isFavorited={isFavorited(craft._id)}
              onFavoriteToggle={() => toggle(craft._id)}
            />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-20 text-center text-subtle">
          {active === "saved"
            ? "No saved pieces yet — heart something you love."
            : search
              ? `No results for "${search}".`
              : "No items in this category yet."}
        </p>
      )}
    </div>
  );
}
