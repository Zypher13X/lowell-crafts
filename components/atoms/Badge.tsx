const COLORS: Record<string, string> = {
  wearables:   "bg-rose-100 text-rose-800",
  home:        "bg-amber-100 text-amber-800",
  amigurumi:   "bg-sky-100 text-sky-800",
  accessories: "bg-emerald-100 text-emerald-800",
};

export default function Badge({ category }: { category: string }) {
  return (
    <span
      className={`w-fit rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
        COLORS[category] ?? "bg-[var(--color-border)] text-muted"
      }`}
    >
      {category}
    </span>
  );
}
