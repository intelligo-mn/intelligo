import { defineConfig, devices } from "@playwright/test";

/**
 * The browser journey over the reference app. It runs against a
 * production build (`pnpm turbo build --filter=app`), on the stub model
 * and console email, so it needs a database and nothing else.
 */
export default defineConfig({
  testDir: "tests/browser",
  testMatch: "**/*.spec.ts",
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:4002",
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "pnpm --filter app start",
    url: "http://localhost:4002/login",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
