import type { Metadata } from "next";
import BlanketBuilder from "@/components/organisms/BlanketBuilder";

export const metadata: Metadata = {
  title: "Blanket Builder",
  description: "Design a granny square blanket with custom patterns, colors, and arrangements — then save it as an SVG.",
};

export default function BlanketPage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="font-serif text-4xl text-body">Blanket Builder</h1>
        <p className="mt-3 max-w-lg text-muted">
          Choose your granny square types, mix and match colors, pick a size, and arrange
          them into a blanket. Save your design as an SVG when you&apos;re ready.
        </p>
      </div>

      <BlanketBuilder />
    </div>
  );
}
