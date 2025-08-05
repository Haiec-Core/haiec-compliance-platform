import { expect, test } from "@playwright/test";

test.describe.parallel("User access to pages", () => {
  test("Logged in users can see home page", async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Nextbase Essential Landing Page");
  });



  test("Logged in users can see terms page", async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto("/terms");
    await expect(
      page.getByRole("heading", { name: "Terms of Service " }),
    ).toBeVisible();
  });

  test("Logged in users can see dashboard", async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForSelector("[data-testid='workspaceId']", {
      state: "attached",
    });
  });


});
