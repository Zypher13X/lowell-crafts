import type { Metadata } from "next";
import PatternVisualizer from "@/components/organisms/PatternVisualizer";

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
