import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI ? "github" : "html",
  // Omit {platform} so the same snapshots work on macOS and Linux CI
  snapshotPathTemplate: "{testDir}/{testFileDir}/{testFileName}-snapshots/{arg}-{projectName}{ext}",
  use: {
    baseURL: "http://localhost:3333",
    trace: "on-first-retry",
    // Consistent viewport for visual snapshots
    viewport: { width: 1280, height: 800 },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
      testMatch: ["**/cross-browser.spec.ts"],
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
      testMatch: ["**/cross-browser.spec.ts"],
    },
  ],
  webServer: {
    command: "npx next dev -p 3333",
    url: "http://localhost:3333/lowell-crafts",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
