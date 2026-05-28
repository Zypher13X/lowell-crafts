const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "The bucket hat I ordered is absolutely gorgeous — the stitch work is so even and it fits perfectly. I've gotten so many compliments.",
    author: "Mara L.",
    item: "Speckled Bucket Hat",
  },
  {
    id: 2,
    quote:
      "My little one won't put down the elephant amigurumi. The attention to detail is incredible for something handmade.",
    author: "Jamie T.",
    item: "Mini Elephant Amigurumi",
  },
  {
    id: 3,
    quote:
      "Ordered a market bag and it arrived beautifully packaged. Sturdy, stylish, and holds way more than I expected.",
    author: "Priya K.",
    item: "Cotton Market Bag",
  },
];

export default function Testimonials() {
  return (
    <section className="mt-20">
      <h2 className="text-center font-serif text-3xl text-body">What People Are Saying</h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.id}
            className="flex flex-col gap-4 rounded-lg border border-default bg-surface p-6"
          >
            <blockquote className="flex-1 text-sm leading-relaxed text-muted">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="text-sm">
              <p className="font-medium text-body">{t.author}</p>
              <p className="text-subtle">{t.item}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
