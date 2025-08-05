import { test } from "@playwright/test";

test.describe.serial("admin panel", () => {
  test("go to admin panel", async ({ browser }) => {
    const adminContext = await browser.newContext({
      storageState: "playwright/.auth/app_admin.json",
    });
    const adminPage = await adminContext.newPage();
    await adminPage.goto("/app_admin");
    await adminPage.getByTestId("admin-panel-layout").waitFor();
  });
});
