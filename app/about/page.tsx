import type { Metadata } from "next";
import FadeIn from "@/components/atoms/FadeIn";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind Lowell Crafts — handmade crochet goods hooked with care.",
};

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Choose the Yarn",
    body: "Every piece starts with picking the right fiber — softness, weight, and color all matter. I lean toward natural fibers: cotton, merino, and alpaca blends wherever possible.",
  },
  {
    step: "02",
    title: "Swatch & Plan",
    body: "Before a single stitch goes into the final piece, I swatch to confirm tension and fit. Small batches mean I can adjust for every colorway rather than locking in a pattern and walking away.",
  },
  {
    step: "03",
    title: "Hook by Hand",
    body: "Everything is worked by hand — no looms, no machines. This is where the time goes, and it's the part I love most. Each stitch is placed with intention.",
  },
  {
    step: "04",
    title: "Finish & Block",
    body: "Blocking transforms a finished piece: stitches even out, edges relax, and the final shape emerges. It's the step most people skip. I never do.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-serif text-4xl text-body">About</h1>
      <div className="mt-8 space-y-6 leading-relaxed text-muted">
        <p>
          Lowell Crafts is a small crochet studio making pieces meant to be worn, used, and loved.
          Every item is hooked by hand — no machines, no shortcuts, no two exactly alike.
        </p>
        <p>
          I started crocheting years ago as a way to slow down, and it stuck. Now I make everything
          from chunky beanies and cozy throws to tiny amigurumi and market totes. Natural fibers
          wherever possible, always soft against the skin.
        </p>
        <p>
          Custom colorways and sizing are always welcome — just reach out on the contact page and
          we&apos;ll figure it out together.
        </p>
      </div>

      <section className="mt-16" aria-labelledby="process-heading">
        <h2 id="process-heading" className="font-serif text-3xl text-body">
          How It&apos;s Made
        </h2>
        <p className="mt-3 text-muted">
          Small batches. No shortcuts. Here&apos;s what goes into every piece.
        </p>
        <ol className="mt-8 space-y-8" aria-label="Making process">
          {PROCESS_STEPS.map((s, i) => (
            <FadeIn key={s.step} delay={i * 100}>
              <li className="flex gap-6">
                <span className="font-serif text-4xl leading-none text-subtle" aria-hidden="true">
                  {s.step}
                </span>
                <div>
                  <h3 className="font-serif text-lg text-body">{s.title}</h3>
                  <p className="mt-1 leading-relaxed text-muted">{s.body}</p>
                </div>
              </li>
            </FadeIn>
          ))}
        </ol>
      </section>
    </div>
  );
}
