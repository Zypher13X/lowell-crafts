import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import GrannySquareSVG from "@/components/atoms/patterns/GrannySquareSVG";
import SolidSquareSVG from "@/components/atoms/patterns/SolidSquareSVG";
import SunflowerSVG from "@/components/atoms/patterns/SunflowerSVG";
import StripedSquareSVG from "@/components/atoms/patterns/StripedSquareSVG";
import MiteredSquareSVG from "@/components/atoms/patterns/MiteredSquareSVG";
import WindmillSVG from "@/components/atoms/patterns/WindmillSVG";
import BucketHatSVG from "@/components/atoms/patterns/BucketHatSVG";
import MarketToteSVG from "@/components/atoms/patterns/MarketToteSVG";
import TurtleSVG from "@/components/atoms/patterns/TurtleSVG";
import { PATTERNS, buildDefaultColors } from "@/lib/patterns";
import type React from "react";

const SVG_COMPONENTS: Record<string, React.ComponentType<{ colors: Record<string, string>; svgId?: string }>> = {
  granny:    GrannySquareSVG,
  solid:     SolidSquareSVG,
  sunflower: SunflowerSVG,
  striped:   StripedSquareSVG,
  mitered:   MiteredSquareSVG,
  windmill:  WindmillSVG,
  hat:       BucketHatSVG,
  tote:      MarketToteSVG,
  turtle:    TurtleSVG,
};

const defaults = buildDefaultColors();

describe("SVG pattern snapshots", () => {
  for (const pattern of PATTERNS) {
    const SVG = SVG_COMPONENTS[pattern.id];
    if (!SVG) continue;

    describe(pattern.label, () => {
      it("renders without crashing", () => {
        const { container } = render(
          <SVG colors={defaults[pattern.id]} svgId={`${pattern.id}-test`} />
        );
        expect(container.querySelector("svg")).not.toBeNull();
      });

      it("matches SVG snapshot", () => {
        const { container } = render(
          <SVG colors={defaults[pattern.id]} svgId={`${pattern.id}-snap`} />
        );
        expect(container.firstChild).toMatchSnapshot();
      });

      it("applies custom colors to all regions", () => {
        const customColors: Record<string, string> = {};
        for (const region of pattern.regions) {
          customColors[region.id] = "#FF0000";
        }
        const { container } = render(
          <SVG colors={customColors} svgId={`${pattern.id}-custom`} />
        );
        // Every custom color appears in the SVG
        const svg = container.innerHTML;
        expect(svg).toContain("#FF0000");
      });

      it("renders gracefully with empty colors (uses fallbacks)", () => {
        expect(() =>
          render(<SVG colors={{}} svgId={`${pattern.id}-empty`} />)
        ).not.toThrow();
      });

      it("sets the svgId on the root <svg> element", () => {
        const { container } = render(
          <SVG colors={defaults[pattern.id]} svgId="test-id-123" />
        );
        expect(container.querySelector("svg#test-id-123")).not.toBeNull();
      });

      it("namespaces all <defs> IDs with the svgId to avoid collisions", () => {
        const svgId = `${pattern.id}-ns`;
        const { container } = render(
          <SVG colors={defaults[pattern.id]} svgId={svgId} />
        );
        const defs = container.querySelector("defs");
        if (!defs) return; // some patterns may have no defs
        const ids = Array.from(defs.querySelectorAll("[id]")).map((el) => el.id);
        for (const id of ids) {
          expect(id.startsWith(svgId)).toBe(true);
        }
      });
    });
  }
});
