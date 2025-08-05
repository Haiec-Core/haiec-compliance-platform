import { expect, test } from "@playwright/test";

test.describe.parallel("Access to pages", () => {
  test("Application admin users can see home page", async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto("/");
    await expect(page.locator("h1")).toContainText(
      "Nextbase Ultimate Landing Page",
    );
  });

  test("Application admin users can see feedback page", async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto("/feedback");
    await expect(
      page.getByRole("heading", { name: "Community Feedback" }),
    ).toBeVisible();
  });

  test("Application admin users can see docs page", async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto("/docs");
    await expect(
      page.getByRole("heading", { name: "Documentation " }),
    ).toBeVisible();
  });

  test("Application admin users can see blog page", async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto("/blog");
    await expect(
      page.getByRole("heading", { name: "All Blog Posts " }),
    ).toBeVisible();
  });

  test("Application admin users can see roadmap page", async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto("/roadmap");
    await expect(page.getByRole("heading", { name: "Roadmap " })).toBeVisible();
  });

  test("Application admin users can see changelog page", async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto("/changelog");
    await expect(page.getByTestId("page-heading-title")).toContainText(
      "Changelog",
    );
  });

  test("Application admin users can see terms page", async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto("/terms");
    await expect(
      page.getByRole("heading", { name: "Terms of Service " }),
    ).toBeVisible();
  });

  test("Application admin users can see admin panel", async ({ page }) => {
    // expect that they are redirected to workspace dashboard page
    await page.goto("/app_admin");
    await page.getByTestId("admin-panel-title").waitFor();
  });
});
