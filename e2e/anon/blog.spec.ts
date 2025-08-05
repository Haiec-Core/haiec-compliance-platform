import { expect, test } from "@playwright/test";

test("Anon users can see blog list page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Blog" }).click();
  await expect(
    page.getByRole("heading", { name: "All blog posts" }),
  ).toBeVisible();
});
