import { test } from "@playwright/test";

test("should have title in home page", async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto("/");
  page.getByText("Nextbase Pro Landing Page");
});

test("Logged in users can see terms page", async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto("/en/terms");
  page.getByRole("heading", { name: "Terms of Service " })
});
