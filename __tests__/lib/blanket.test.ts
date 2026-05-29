import { describe, it, expect } from "vitest";
import {
  autoColsForRows, getGrannyPatterns, buildDefaultVariant,
  BLANKET_PRESETS, ARRANGEMENTS,
} from "@/lib/blanket";

describe("autoColsForRows", () => {
  it("returns an even number for all presets", () => {
    [6, 10, 12, 16, 20].forEach((rows) => {
      expect(autoColsForRows(rows) % 2).toBe(0);
    });
  });

  it("maintains a 3:4 width-to-height ratio within ±1 column", () => {
    [6, 10, 12, 16, 20].forEach((rows) => {
      const cols = autoColsForRows(rows);
      const ratio = cols / rows;
      expect(ratio).toBeGreaterThan(0.6);
      expect(ratio).toBeLessThan(0.9);
    });
  });

  it("never returns less than 2", () => {
    expect(autoColsForRows(1)).toBeGreaterThanOrEqual(2);
    expect(autoColsForRows(2)).toBeGreaterThanOrEqual(2);
  });

  it("known values", () => {
    expect(autoColsForRows(6)).toBe(4);
    expect(autoColsForRows(8)).toBe(6);
    expect(autoColsForRows(12)).toBe(10);
    expect(autoColsForRows(16)).toBe(12);
    expect(autoColsForRows(20)).toBe(16);
  });
});

describe("getGrannyPatterns", () => {
  it("returns only granny group patterns", () => {
    const patterns = getGrannyPatterns();
    expect(patterns.every((p) => p.groupId === "granny")).toBe(true);
  });

  it("returns 6 granny patterns", () => {
    expect(getGrannyPatterns()).toHaveLength(6);
  });
});

describe("buildDefaultVariant", () => {
  it("sets patternId", () => {
    const v = buildDefaultVariant("granny");
    expect(v.patternId).toBe("granny");
  });

  it("populates colors from pattern defaults", () => {
    const v = buildDefaultVariant("granny");
    expect(Object.keys(v.colors).length).toBeGreaterThan(0);
    Object.values(v.colors).forEach((hex) => {
      expect(hex).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });

  it("works for all granny patterns", () => {
    getGrannyPatterns().forEach((p) => {
      const v = buildDefaultVariant(p.id);
      expect(Object.keys(v.colors)).toEqual(p.regions.map((r) => r.id));
    });
  });
});

describe("BLANKET_PRESETS", () => {
  it("has 6 presets including custom", () => {
    expect(BLANKET_PRESETS).toHaveLength(6);
    expect(BLANKET_PRESETS.find((p) => p.id === "custom")).toBeDefined();
  });

  it("all non-custom presets have positive even rows", () => {
    BLANKET_PRESETS.filter((p) => p.id !== "custom").forEach((preset) => {
      expect(preset.rows).toBeGreaterThan(0);
      expect(preset.rows % 2).toBe(0);
    });
  });
});

describe("ARRANGEMENTS", () => {
  it("has 7 arrangements", () => {
    expect(ARRANGEMENTS).toHaveLength(7);
  });

  it("all arrangements return values in [0, count-1] for valid counts", () => {
    const ROWS = 8, COLS = 6;
    [1, 2, 4, 6].forEach((count) => {
      ARRANGEMENTS.forEach((arr) => {
        if (count < arr.minVariants) return;
        if (arr.maxVariants !== undefined && count > arr.maxVariants) return;
        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
            const idx = arr.fn(r, c, ROWS, COLS, count);
            expect(idx).toBeGreaterThanOrEqual(0);
            expect(idx).toBeLessThan(count);
          }
        }
      });
    });
  });

  it("solid arrangement always returns 0", () => {
    const solid = ARRANGEMENTS.find((a) => a.id === "solid")!;
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        expect(solid.fn(r, c, 10, 10, 6)).toBe(0);
      }
    }
  });

  it("checkerboard alternates between at most 2 values", () => {
    const cb = ARRANGEMENTS.find((a) => a.id === "checkerboard")!;
    const values = new Set<number>();
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        values.add(cb.fn(r, c, 4, 4, 6));
      }
    }
    expect(values.size).toBeLessThanOrEqual(2);
  });

  it("solid is the only arrangement with minVariants === 1", () => {
    const forOne = ARRANGEMENTS.filter((a) => a.minVariants <= 1);
    expect(forOne).toHaveLength(1);
    expect(forOne[0].id).toBe("solid");
  });

  it("all non-solid arrangements require at least 2 variants", () => {
    ARRANGEMENTS.filter((a) => a.id !== "solid").forEach((arr) => {
      expect(arr.minVariants).toBeGreaterThanOrEqual(2);
    });
  });

  it("solid has maxVariants === 1", () => {
    const solid = ARRANGEMENTS.find((a) => a.id === "solid")!;
    expect(solid.maxVariants).toBe(1);
  });

  it("checkerboard has maxVariants === 2", () => {
    const cb = ARRANGEMENTS.find((a) => a.id === "checkerboard")!;
    expect(cb.maxVariants).toBe(2);
  });

  it("all arrangements other than solid and checkerboard have no maxVariants", () => {
    ARRANGEMENTS
      .filter((a) => a.id !== "solid" && a.id !== "checkerboard")
      .forEach((arr) => {
        expect(arr.maxVariants).toBeUndefined();
      });
  });

  it("checkerboard always returns 0 or 1 regardless of count", () => {
    const cb = ARRANGEMENTS.find((a) => a.id === "checkerboard")!;
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 6; c++) {
        const idx = cb.fn(r, c, 6, 6, 2);
        expect(idx === 0 || idx === 1).toBe(true);
      }
    }
  });
});
