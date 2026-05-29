import { test, expect, type Page } from "@playwright/test";

const BASE = "/lowell-crafts";

async function waitForStudio(page: Page) {
  await page.waitForSelector('[aria-label$="color preview"]', { timeout: 10_000 });
}

// ── Navigation ────────────────────────────────────────────────────────

test.describe("Navigation", () => {
  test("nav contains all expected links", async ({ page }) => {
    await page.goto(`${BASE}/`);
    const nav = page.getByRole("navigation");
    await expect(nav.getByRole("link", { name: "Shop" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Studio" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Blanket" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "About" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Contact" })).toBeVisible();
  });

  test("navigating to Color Studio loads the visualizer", async ({ page }) => {
    await page.goto(`${BASE}/`);
    await page.getByRole("navigation").getByRole("link", { name: "Studio" }).click();
    await waitForStudio(page);
    await expect(page).toHaveURL(/visualizer/);
  });

  test("navigating to Blanket Builder loads the builder", async ({ page }) => {
    await page.goto(`${BASE}/`);
    await page.getByRole("navigation").getByRole("link", { name: "Blanket" }).click();
    await expect(page).toHaveURL(/blanket/);
    await expect(page.getByRole("heading", { name: /blanket builder/i })).toBeVisible();
  });
});

// ── Color Studio — functional ────────────────────────────────────────

test.describe("Color Studio — functional", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/visualizer`);
    await waitForStudio(page);
  });

  test("pattern group tabs switch the active pattern", async ({ page }) => {
    // Start on Granny Square group (default)
    const grannyTab = page.getByRole("button", { name: "Granny Square" });
    await expect(grannyTab).toHaveAttribute("aria-pressed", "true");

    // Switch to Bucket Hat
    await page.getByRole("button", { name: "Bucket Hat" }).click();
    await expect(page.getByRole("button", { name: "Bucket Hat" })).toHaveAttribute("aria-pressed", "true");
    await expect(grannyTab).toHaveAttribute("aria-pressed", "false");
  });

  test("granny variant pills switch the active variant", async ({ page }) => {
    await page.getByRole("button", { name: "Granny Square" }).click();

    const classicPill = page.getByRole("button", { name: "Classic" });
    await expect(classicPill).toHaveAttribute("aria-pressed", "true");

    await page.getByRole("button", { name: "Sunflower" }).click();
    await expect(page.getByRole("button", { name: "Sunflower" })).toHaveAttribute("aria-pressed", "true");
    await expect(classicPill).toHaveAttribute("aria-pressed", "false");
  });

  test("color region selector buttons are present and clickable", async ({ page }) => {
    // Color regions list should have multiple buttons
    const regionButtons = page.locator("[aria-pressed]").filter({ hasText: /center|inner|outer|border/i });
    await expect(regionButtons.first()).toBeVisible();
    await regionButtons.first().click();
    await expect(regionButtons.first()).toHaveAttribute("aria-pressed", "true");
  });

  test("yarn palette swatches apply color when clicked", async ({ page }) => {
    // Click a yarn swatch — Snow is always present
    const swatch = page.getByRole("button", { name: /snow/i });
    await expect(swatch).toBeVisible();
    await swatch.click();
    await expect(swatch).toHaveAttribute("aria-pressed", "true");
  });

  test("reset button is present", async ({ page }) => {
    await expect(page.getByRole("button", { name: /reset/i })).toBeVisible();
  });

  test("Save as SVG button is present", async ({ page }) => {
    await expect(page.getByRole("button", { name: /save as svg/i })).toBeVisible();
  });
});

// ── Blanket Builder — functional ─────────────────────────────────────

test.describe("Blanket Builder — functional", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/blanket`);
    // Wait for the builder to be interactive
    await page.waitForSelector("text=Square Types");
  });

  test("square type count buttons render and toggle", async ({ page }) => {
    // Default is 2 variants
    const btn2 = page.getByRole("button", { name: "2", exact: true });
    await expect(btn2).toHaveAttribute("aria-pressed", "true");

    // Switch to 3
    const btn3 = page.getByRole("button", { name: "3", exact: true });
    await btn3.click();
    await expect(btn3).toHaveAttribute("aria-pressed", "true");
    await expect(btn2).toHaveAttribute("aria-pressed", "false");
  });

  test("variant tabs appear matching the count", async ({ page }) => {
    // With 2 variants, should have Square 1 and Square 2 tabs
    await expect(page.getByRole("button", { name: /square 1/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /square 2/i })).toBeVisible();
  });

  test("blanket size presets switch active state", async ({ page }) => {
    // Throw is default
    const throwPreset = page.getByRole("button", { name: "Throw" });
    await expect(throwPreset).toHaveAttribute("aria-pressed", "true");

    await page.getByRole("button", { name: "Baby" }).click();
    await expect(page.getByRole("button", { name: "Baby" })).toHaveAttribute("aria-pressed", "true");
    await expect(throwPreset).toHaveAttribute("aria-pressed", "false");
  });

  test("custom size preset shows height input", async ({ page }) => {
    await page.getByRole("button", { name: "Custom" }).click();
    await expect(page.getByLabel(/height/i)).toBeVisible();
  });

  test("arrangement buttons respect variant count constraints", async ({ page }) => {
    // Default is 2 variants
    // Row Stripes has no max — should be enabled
    const rowStripes = page.getByRole("button", { name: "Row Stripes" });
    await expect(rowStripes).toBeVisible();
    await expect(rowStripes).not.toBeDisabled();

    // Checkerboard works with exactly 2 — enabled at default count of 2
    const checkerboard = page.getByRole("button", { name: "Checkerboard" });
    await expect(checkerboard).not.toBeDisabled();

    // Add a 3rd type — checkerboard (max 2) should become disabled
    await page.getByRole("button", { name: "3", exact: true }).click();
    await expect(checkerboard).toBeDisabled();

    // Row Stripes should remain enabled with 3 variants
    await expect(rowStripes).not.toBeDisabled();
  });

  test("Save as SVG button is present", async ({ page }) => {
    await expect(page.getByRole("button", { name: /save as svg/i })).toBeVisible();
  });

  test("dimensions label updates with size preset changes", async ({ page }) => {
    // Default Throw preset: 10 cols × 12 rows
    await expect(page.getByText(/×.*granny squares/i)).toBeVisible();

    await page.getByRole("button", { name: "Baby" }).click();
    // Baby: 6 rows → 4 cols
    await expect(page.getByText(/4 × 6/)).toBeVisible();
  });
});
