import { expect, test } from "@playwright/test";

test.describe.serial("Blog Post Management", () => {
  let blogPostId: string | undefined;
  let blogPostTitle: string | undefined;

  test("Admin creates a new blog post", async ({ browser }) => {
    const adminContext = await browser.newContext({
      storageState: "playwright/.auth/app_admin.json",
    });
    const adminPage = await adminContext.newPage();

    await adminPage.goto("/app_admin/marketing/blog");
    await adminPage.getByRole("button", { name: "Create Blog Post" }).click();

    await adminPage.waitForURL(/\/app_admin\/marketing\/blog\/[a-zA-Z0-9-]+$/);
    const url = await adminPage.url();
    blogPostId = url.split("/").pop();
    expect(blogPostId).toBeDefined();

    const randomTitleSuffix = Math.random().toString(36).substring(2, 15);
    blogPostTitle = `Test Blog Post ${randomTitleSuffix}`;

    await adminPage.getByLabel("Title").fill(blogPostTitle);
    await adminPage.locator("#status").click();
    await adminPage.getByLabel("Published").click();
    await adminPage.getByLabel("Summary").fill("This is a test summary");
    await adminPage.getByRole("button", { name: "Update Blog Post" }).click();

    await adminPage.getByRole("link", { name: "Marketing Blog" }).click();
    await adminPage.waitForURL(`/app_admin/marketing/blog`);
    await expect(adminPage.getByText(blogPostTitle)).toBeVisible();

    await adminContext.close();
  });

  test("Anonymous user can see the published blog post", async ({ page }) => {
    await page.goto("/blog");

    const blogPostLink = page.getByRole("link", { name: blogPostTitle });
    await expect(blogPostLink).toBeVisible();

    await blogPostLink.click();

    await page.waitForURL(/\/blog\/[a-zA-Z0-9-]+$/);
    await expect(
      page.getByRole("heading", { name: blogPostTitle }),
    ).toBeVisible();
  });

  test("Admin can edit the blog post", async ({ browser }) => {
    const adminContext = await browser.newContext({
      storageState: "playwright/.auth/app_admin.json",
    });
    const adminPage = await adminContext.newPage();

    await adminPage.goto(`/app_admin/marketing/blog/${blogPostId}`);

    const updatedTitle = `${blogPostTitle} (Updated)`;
    await adminPage.getByLabel("Title").fill(updatedTitle);
    await adminPage.getByRole("button", { name: "Update Blog Post" }).click();

    await adminPage.getByRole("link", { name: "Marketing Blog" }).click();
    await adminPage.waitForURL(`/app_admin/marketing/blog`);
    await expect(adminPage.getByText(updatedTitle)).toBeVisible();

    if (!blogPostTitle) {
      throw new Error("Blog post title is undefined");
    }
    blogPostTitle = updatedTitle;

    await adminContext.close();
  });

  test("Anonymous user can see the updated blog post", async ({ page }) => {
    await page.goto("/blog");

    const updatedBlogPostLink = page.getByRole("link", { name: blogPostTitle });
    await expect(updatedBlogPostLink).toBeVisible();

    await updatedBlogPostLink.click();

    await page.waitForURL(/\/blog\/[a-zA-Z0-9-]+$/);
    await expect(
      page.getByRole("heading", { name: blogPostTitle }),
    ).toBeVisible();
  });

  test("Admin can change blog post status", async ({ browser }) => {
    const adminContext = await browser.newContext({
      storageState: "playwright/.auth/app_admin.json",
    });
    const adminPage = await adminContext.newPage();

    await adminPage.goto(`/app_admin/marketing/blog/${blogPostId}`);

    await adminPage.locator("#status").click();
    await adminPage.getByLabel("Draft").click();
    await adminPage.getByRole("button", { name: "Update Blog Post" }).click();

    await adminPage.getByRole("link", { name: "Marketing Blog" }).click();
    const row = adminPage.getByTestId(`admin-blog-list-row-${blogPostId}`);
    const statusCell = row.getByRole("cell", { name: "Draft" });
    await expect(statusCell).toBeVisible();

    await adminContext.close();
  });

  test("Anonymous user cannot see the draft blog post", async ({ page }) => {
    await page.goto("/blog");

    const blogPostLink = page.getByRole("link", { name: blogPostTitle });
    await expect(blogPostLink).not.toBeVisible();
  });

  test("Admin can delete the blog post", async ({ browser }) => {
    const adminContext = await browser.newContext({
      storageState: "playwright/.auth/app_admin.json",
    });
    const adminPage = await adminContext.newPage();

    await adminPage.goto("/app_admin/marketing/blog");

    const deleteButton = adminPage
      .getByRole("row", { name: blogPostTitle })
      .getByTestId("delete-blog-post-dialog-trigger");
    await deleteButton.click();
    await adminPage.getByTestId("confirm-delete-button").waitFor();
    await adminPage.getByTestId("confirm-delete-button").click();

    if (!blogPostTitle) {
      throw new Error("Blog post title is undefined");
    }

    await adminPage.getByText("Blog post deleted successfully").waitFor();
    // reload
    await adminPage.reload();
    await expect(adminPage.getByText(blogPostTitle)).not.toBeVisible();

    await adminContext.close();
  });
});
