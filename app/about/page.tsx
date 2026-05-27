import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Lowell Crafts",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-serif text-4xl text-body">About</h1>
      <div className="mt-8 space-y-6 text-muted leading-relaxed">
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
          we'll figure it out together.
        </p>
      </div>
    </div>
  );
}
