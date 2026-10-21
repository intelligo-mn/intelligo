import { expect, test, type BrowserContext, type Page } from "@playwright/test";

/**
 * One account through the reference app. Serial: each step relies on
 * the session and the workspace the previous one created.
 */
test.describe.configure({ mode: "serial" });

const email = `e2e+${Date.now()}@example.com`;
/** Passes the sign-up schema: 8+ characters, an upper, a lower and a digit. */
const password = "Browser-Journey-0";

/**
 * Types into the composer and sends. Text typed before the page has
 * hydrated is dropped, so it types again until the send button enables.
 */
async function send(page: Page, text: string): Promise<void> {
  const input = page.getByPlaceholder("Send a message…");
  const button = page.getByRole("button", { name: "Send message" });
  await expect(async () => {
    await input.fill(text);
    await expect(button).toBeEnabled({ timeout: 1_000 });
  }).toPass({ timeout: 20_000 });
  await button.click();
}

test.describe("reference app journey", () => {
  let context: BrowserContext;
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
  });
  test.afterAll(() => context.close());

  test("signs up and lands in a workspace", async () => {
    await page.goto("/signup");
    await page.getByLabel("Name").fill("Browser Journey");
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password", { exact: true }).fill(password);
    await page.getByLabel("Confirm password").fill(password);
    await page.getByRole("button", { name: "Create account" }).click();
    await expect(page.getByText(/Password must contain/)).toHaveCount(0);
    await expect(page).toHaveURL(/\/onboarding/);
    await page.getByRole("button", { name: "Skip for now" }).click();
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test("shows the workspace's plan", async () => {
    await page.goto("/settings/billing");
    await expect(page.getByText("Current plan", { exact: true })).toBeVisible();
    await expect(page.getByText("Free", { exact: true }).first()).toBeVisible();
    await expect(
      page.getByText("Credit balance", { exact: true })
    ).toBeVisible();
  });

  test("runs a chat turn on the stub model and records it", async () => {
    await page.goto("/chat");
    await send(page, "hello from the browser");
    await expect(
      page.getByText('You said: "hello from the browser"')
    ).toBeVisible({ timeout: 30_000 });

    // The turn settles after its stream closes; until then the row
    // reads "Settling", so the usage page is reloaded until it succeeds.
    await expect
      .poll(
        async () => {
          await page.goto("/usage");
          await expect(
            page.getByText("Recent requests", { exact: true })
          ).toBeVisible();
          return page.getByText("Succeeded", { exact: true }).count();
        },
        { timeout: 20_000, intervals: [500, 1_000, 2_000] }
      )
      .toBeGreaterThan(0);
  });

  test("saves an artifact through the tool path", async () => {
    await page.goto("/chat");
    await send(page, "save browser note");
    await expect(page.getByText(/Saving that as an artifact/)).toBeVisible({
      timeout: 30_000,
    });
    // The turn has finished and the tool's card is in the transcript
    // before the page is left.
    await expect(
      page.getByRole("button", { name: "Stop generating" })
    ).toHaveCount(0, { timeout: 30_000 });
    await expect(
      page.getByText("browser note", { exact: true }).first()
    ).toBeVisible({ timeout: 30_000 });

    // Reloads the artifacts page until the saved document is listed.
    await expect
      .poll(
        async () => {
          await page.goto("/artifacts");
          return page.getByText("browser note", { exact: true }).count();
        },
        { timeout: 20_000, intervals: [500, 1_000, 2_000] }
      )
      .toBeGreaterThan(0);
  });
});
