import { test, expect, type Page } from "@playwright/test";

const BASE = "/lowell-crafts";

// Wait for PatternVisualizer's dynamic import to finish loading
async function waitForStudio(page: Page) {
  await page.waitForSelector('[aria-label$="color preview"]', { timeout: 10_000 });
}

// ── Color Studio — pattern screenshots ──────────────────────────────

test.describe("Color Studio — visual snapshots", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/visualizer`);
    await waitForStudio(page);
  });

  const GRANNY_VARIANTS = [
    { pill: "Classic",  label: "Granny Square" },
    { pill: "Solid",    label: "Solid Square" },
    { pill: "Sunflower",label: "Sunflower" },
    { pill: "Striped",  label: "Striped Square" },
    { pill: "Mitered",  label: "Mitered Square" },
    { pill: "Windmill", label: "Windmill" },
  ];

  for (const { pill, label } of GRANNY_VARIANTS) {
    test(`Granny Square › ${label}`, async ({ page }) => {
      await page.getByRole("button", { name: "Granny Square" }).click();
      await page.getByRole("button", { name: pill }).click();
      await page.waitForTimeout(100); // let SVG re-render
      const canvas = page.locator(".overflow-hidden.rounded-2xl");
      await expect(canvas).toHaveScreenshot(`granny-${pill.toLowerCase()}.png`);
    });
  }

  test("Bucket Hat", async ({ page }) => {
    await page.getByRole("button", { name: "Bucket Hat" }).click();
    await page.waitForTimeout(100);
    const canvas = page.locator(".overflow-hidden.rounded-2xl");
    await expect(canvas).toHaveScreenshot("bucket-hat.png");
  });

  test("Market Tote", async ({ page }) => {
    await page.getByRole("button", { name: "Market Tote" }).click();
    await page.waitForTimeout(100);
    const canvas = page.locator(".overflow-hidden.rounded-2xl");
    await expect(canvas).toHaveScreenshot("market-tote.png");
  });

  test("Turtle", async ({ page }) => {
    await page.getByRole("button", { name: "Turtle" }).click();
    await page.waitForTimeout(100);
    const canvas = page.locator(".overflow-hidden.rounded-2xl");
    await expect(canvas).toHaveScreenshot("turtle.png");
  });
});

// ── Theme screenshots ────────────────────────────────────────────────

test.describe("Theme visual snapshots", () => {
  const THEMES = ["light", "dark", "craft"] as const;

  for (const theme of THEMES) {
    test(`Home page — ${theme} theme`, async ({ page }) => {
      await page.goto(`${BASE}/`);
      await page.evaluate((t) => localStorage.setItem("theme", t), theme);
      await page.reload();
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveScreenshot(`home-${theme}.png`, {
        fullPage: false,
        clip: { x: 0, y: 0, width: 1280, height: 800 },
      });
    });

    test(`Color Studio — ${theme} theme`, async ({ page }) => {
      // Navigate first so localStorage is accessible, then reload with the theme applied
      await page.goto(`${BASE}/visualizer`);
      await page.evaluate((t) => localStorage.setItem("theme", t), theme);
      await page.reload();
      await waitForStudio(page);
      await expect(page).toHaveScreenshot(`studio-${theme}.png`, {
        fullPage: false,
        clip: { x: 0, y: 0, width: 1280, height: 800 },
      });
    });
  }
});

// ── Color interaction ────────────────────────────────────────────────

test.describe("Color Studio — color interactions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/visualizer`);
    await waitForStudio(page);
  });

  test("applying a color updates the SVG and colorway bar", async ({ page }) => {
    // Click "Center" region (already active), then pick Snow
    await page.getByRole("button", { name: /snow/i }).click();
    await page.waitForTimeout(100);
    const canvas = page.locator(".overflow-hidden.rounded-2xl");
    await expect(canvas).toHaveScreenshot("granny-center-snow.png");
  });

  test("reset restores default colors", async ({ page }) => {
    await page.getByRole("button", { name: /snow/i }).click();
    await page.getByRole("button", { name: /reset/i }).click();
    await page.waitForTimeout(100);
    const canvas = page.locator(".overflow-hidden.rounded-2xl");
    await expect(canvas).toHaveScreenshot("granny-classic.png");
  });
});
