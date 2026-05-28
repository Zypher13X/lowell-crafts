import Link from "next/link";
import { getCrafts } from "@/lib/queries";
import CraftCard from "@/components/organisms/CraftCard";

export default async function NotFound() {
  const crafts = await getCrafts();
  const suggestions = crafts.slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-col items-center py-16 text-center">
        <p className="font-serif text-8xl text-subtle">◇</p>
        <h1 className="mt-6 font-serif text-4xl text-body">Page Not Found</h1>
        <p className="mt-4 max-w-sm text-muted">
          This stitch got dropped somewhere along the way. Let&apos;s get you back on track.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-md bg-accent px-6 py-3 text-sm font-medium text-on-accent transition-opacity hover:opacity-90"
        >
          Back to Shop
        </Link>
      </div>

      {suggestions.length > 0 && (
        <section aria-labelledby="suggestions-heading" className="mt-4 border-t border-default pt-12">
          <h2 id="suggestions-heading" className="text-center font-serif text-2xl text-body">
            You might like these
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {suggestions.map((craft, i) => (
              <CraftCard key={craft._id} craft={craft} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
