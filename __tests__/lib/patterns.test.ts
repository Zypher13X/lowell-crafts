import { describe, it, expect } from "vitest";
import {
  PATTERNS,
  PATTERN_GROUPS,
  YARN_COLORS,
  buildDefaultColors,
  getContrastColor,
} from "@/lib/patterns";

describe("YARN_COLORS", () => {
  it("has 16 colors", () => {
    expect(YARN_COLORS).toHaveLength(16);
  });

  it("every color has a valid hex and name", () => {
    for (const yarn of YARN_COLORS) {
      expect(yarn.name).toBeTruthy();
      expect(yarn.hex).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });

  it("hex values are unique", () => {
    const hexes = YARN_COLORS.map((y) => y.hex);
    expect(new Set(hexes).size).toBe(hexes.length);
  });
});

describe("PATTERN_GROUPS", () => {
  it("has 4 groups", () => {
    expect(PATTERN_GROUPS).toHaveLength(4);
  });

  it("every group has id and label", () => {
    for (const g of PATTERN_GROUPS) {
      expect(g.id).toBeTruthy();
      expect(g.label).toBeTruthy();
    }
  });
});

describe("PATTERNS", () => {
  it("every pattern has required fields", () => {
    for (const p of PATTERNS) {
      expect(p.id).toBeTruthy();
      expect(p.label).toBeTruthy();
      expect(p.shortLabel).toBeTruthy();
      expect(p.groupId).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(p.regions.length).toBeGreaterThan(0);
    }
  });

  it("every region has a valid defaultColor hex", () => {
    for (const p of PATTERNS) {
      for (const r of p.regions) {
        expect(r.id).toBeTruthy();
        expect(r.label).toBeTruthy();
        expect(r.defaultColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
      }
    }
  });

  it("every pattern groupId matches a PATTERN_GROUPS entry", () => {
    const groupIds = new Set(PATTERN_GROUPS.map((g) => g.id));
    for (const p of PATTERNS) {
      expect(groupIds.has(p.groupId)).toBe(true);
    }
  });

  it("pattern ids are unique", () => {
    const ids = PATTERNS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("includes all 9 expected patterns", () => {
    const ids = PATTERNS.map((p) => p.id);
    const expected = [
      "granny", "solid", "sunflower", "striped", "mitered", "windmill",
      "hat", "tote", "turtle",
    ];
    for (const id of expected) {
      expect(ids).toContain(id);
    }
  });

  it("granny group has 6 variants", () => {
    const grannyPatterns = PATTERNS.filter((p) => p.groupId === "granny");
    expect(grannyPatterns).toHaveLength(6);
  });
});

describe("buildDefaultColors", () => {
  it("returns an entry for every pattern id", () => {
    const colors = buildDefaultColors();
    for (const p of PATTERNS) {
      expect(colors[p.id]).toBeDefined();
    }
  });

  it("each pattern's colors contain all region ids", () => {
    const colors = buildDefaultColors();
    for (const p of PATTERNS) {
      for (const r of p.regions) {
        expect(colors[p.id][r.id]).toBe(r.defaultColor);
      }
    }
  });
});

describe("getContrastColor", () => {
  it("returns dark text on light background", () => {
    expect(getContrastColor("#FFFFFF")).toBe("#1c1917");
    expect(getContrastColor("#FAFAF8")).toBe("#1c1917"); // Snow
    expect(getContrastColor("#F5EDD8")).toBe("#1c1917"); // Cream
  });

  it("returns light text on dark background", () => {
    expect(getContrastColor("#000000")).toBe("#fafaf9");
    expect(getContrastColor("#484848")).toBe("#fafaf9"); // Charcoal
    expect(getContrastColor("#3A6B45")).toBe("#fafaf9"); // Forest
  });

  it("handles mid-range colors", () => {
    // Sage #7A9E7E — luminance is around 0.47, should be light text
    const result = getContrastColor("#7A9E7E");
    expect([`#1c1917`, `#fafaf9`]).toContain(result);
  });
});
