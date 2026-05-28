import dynamic from "next/dynamic";
import type { Metadata } from "next";

const PatternVisualizer = dynamic(
  () => import("@/components/organisms/PatternVisualizer"),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start animate-pulse">
        <div className="flex flex-col gap-5 lg:flex-1">
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 w-28 rounded-full bg-surface" />
            ))}
          </div>
          <div className="aspect-square rounded-2xl bg-surface" />
        </div>
        <div className="flex flex-col gap-8 lg:w-72">
          <div className="h-48 rounded-lg bg-surface" />
          <div className="h-40 rounded-lg bg-surface" />
        </div>
      </div>
    ),
  }
);

export const metadata: Metadata = {
  title: "Color Studio",
  description: "Pick a crochet pattern and experiment with yarn color combinations in real time.",
};

export default function VisualizerPage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="font-serif text-4xl text-body">Color Studio</h1>
        <p className="mt-3 max-w-lg text-muted">
          Pick a region, choose a yarn color, and watch the pattern update live. Save your
          favorite colorway as an SVG when you&apos;re done.
        </p>
      </div>

      <PatternVisualizer />
    </div>
  );
}
