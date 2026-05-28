export default function Loading() {
  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="mb-6 break-inside-avoid animate-pulse">
          <div className="overflow-hidden rounded-lg border border-default bg-surface">
            <div
              className={`bg-[var(--color-border)] ${
                i % 3 === 0 ? "aspect-square" : i % 3 === 1 ? "aspect-[4/5]" : "aspect-[3/4]"
              }`}
            />
            <div className="flex flex-col gap-2 p-4">
              <div className="h-5 w-20 rounded-full bg-[var(--color-border)]" />
              <div className="h-5 w-3/4 rounded bg-[var(--color-border)]" />
              <div className="h-4 w-full rounded bg-[var(--color-border)] opacity-60" />
              <div className="h-4 w-5/6 rounded bg-[var(--color-border)] opacity-60" />
              <div className="mt-2 h-5 w-16 rounded bg-[var(--color-border)]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
