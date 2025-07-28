import { expect, test } from "@playwright/test";

test.describe.skip("Changelog Management", () => {
  let changelogId: string | undefined;
  let changelogTitle: string | undefined;

  test("Admin creates a new changelog", async ({ browser }) => {
    const adminContext = await browser.newContext({
      storageState: "playwright/.auth/app_admin.json",
    });
    const adminPage = await adminContext.newPage();

    await adminPage.goto("/app_admin/marketing/changelog");
    await adminPage.getByRole("button", { name: "Create Changelog" }).click();

    await adminPage.waitForURL(
      /\/app_admin\/marketing\/changelog\/[a-zA-Z0-9-]+$/,
    );
    const url = await adminPage.url();
    changelogId = url.split("/").pop();
    expect(changelogId).toBeDefined();

    const randomTitleSuffix = Math.random().toString(36).substring(2, 15);
    changelogTitle = `Test Changelog ${randomTitleSuffix}`;

    await adminPage.getByLabel("Title").fill(changelogTitle);
    await adminPage.locator("#status").click();
    await adminPage.getByLabel("Published").click();
    await adminPage.getByRole("button", { name: "Update Changelog" }).click();

    await adminPage
      .getByRole("link", { name: "Marketing Changelog List" })
      .click();
    await adminPage.waitForURL(`/app_admin/marketing/changelog`);
    await expect(adminPage.getByText(changelogTitle)).toBeVisible();

    await adminContext.close();
  });

  test("Anonymous user can see the published changelog", async ({ page }) => {
    await page.goto("/changelog");
    if (!changelogTitle) {
      throw new Error("Changelog title is undefined");
    }
    await expect(page.getByText(changelogTitle)).toBeVisible();
  });

  test("Admin can edit the changelog", async ({ browser }) => {
    const adminContext = await browser.newContext({
      storageState: "playwright/.auth/app_admin.json",
    });
    const adminPage = await adminContext.newPage();

    await adminPage.goto(`/app_admin/marketing/changelog/${changelogId}`);

    const updatedTitle = `${changelogTitle} (Updated)`;
    await adminPage.getByLabel("Title").fill(updatedTitle);
    const submitButton = await adminPage.getByRole("button", {
      name: "Update Changelog",
    });
    await submitButton.click();
    await adminPage.waitForTimeout(5000);
    await adminPage.goto("/app_admin/marketing/changelog");
    await adminPage.waitForURL(`/app_admin/marketing/changelog`);
    await expect(adminPage.getByText(updatedTitle)).toBeVisible();

    if (!changelogTitle) {
      throw new Error("Changelog title is undefined");
    }
    changelogTitle = updatedTitle;

    await adminContext.close();
  });

  test("Anonymous user can see the updated changelog", async ({ page }) => {
    await page.goto("/changelog");
    if (!changelogTitle) {
      throw new Error("Changelog title is undefined");
    }
    await expect(page.getByText(changelogTitle)).toBeVisible();
  });

  test("Admin can change changelog status", async ({ browser }) => {
    const adminContext = await browser.newContext({
      storageState: "playwright/.auth/app_admin.json",
    });
    const adminPage = await adminContext.newPage();

    await adminPage.goto(`/app_admin/marketing/changelog/${changelogId}`);

    await adminPage.locator("#status").click();
    await adminPage.getByLabel("Draft").click();
    await adminPage.getByRole("button", { name: "Update Changelog" }).click();

    await adminPage.waitForTimeout(5000);

    await adminPage.goto("/app_admin/marketing/changelog");
    const row = adminPage.getByRole("row", { name: changelogTitle });
    const statusCell = row.getByRole("cell", { name: "Draft" });
    await expect(statusCell).toBeVisible();

    await adminContext.close();
  });

  test("Anonymous user cannot see the draft changelog", async ({ page }) => {
    await page.goto("/changelog");
    if (!changelogTitle) {
      throw new Error("Changelog title is undefined");
    }
    await expect(page.getByText(changelogTitle)).not.toBeVisible();
  });

  test("Admin can delete the changelog", async ({ browser }) => {
    const adminContext = await browser.newContext({
      storageState: "playwright/.auth/app_admin.json",
    });
    const adminPage = await adminContext.newPage();

    await adminPage.goto("/app_admin/marketing/changelog");

    const deleteButton = adminPage
      .getByRole("row", { name: changelogTitle })
      .getByTestId("delete-changelog-dialog-trigger");
    await deleteButton.click();
    await adminPage.getByTestId("confirm-delete-button").waitFor();
    await adminPage.getByTestId("confirm-delete-button").click();
    if (!changelogTitle) {
      throw new Error("Changelog title is undefined");
    }

    await adminPage.getByText("Changelog deleted successfully").waitFor();
    await adminPage.reload();
    await expect(adminPage.getByText(changelogTitle)).not.toBeVisible();

    await adminContext.close();
  });
});
