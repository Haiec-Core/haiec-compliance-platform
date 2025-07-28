import { expect, test } from "@playwright/test";
import Chance from "chance";

test.describe.skip("Admin Feedback Management", () => {
  let feedbackId: string | undefined;
  const feedbackTitle = Chance().sentence();
  const feedbackDescription = Chance().sentence();

  test("User creates feedback", async ({ page }) => {
    // Navigate to the dashboard and create feedback
    await page.goto("/dashboard");
    await page.getByTestId("sidebar-user-nav-avatar-button").click();
    await page.getByRole("menuitem", { name: "Feedback" }).click();
    await page.getByTestId("feedback-heading-actions-trigger").click();
    await page.getByRole("button", { name: "Create Feedback" }).click();
    await page.getByTestId("feedback-title-input").fill(feedbackTitle);
    await page.getByTestId("feedback-content-input").fill(feedbackDescription);
    await page.getByTestId("submit-feedback-button").click();

    // Wait for the feedback to be created and get its ID
    await page.waitForURL(/\/feedback\/[a-zA-Z0-9-]+$/);
    const url = await page.url();
    feedbackId = url.split("/").pop();
    expect(feedbackId).toBeDefined();
  });

  test("Admin can view and update feedback", async ({ browser }) => {
    const adminContext = await browser.newContext({
      storageState: "playwright/.auth/app_admin.json",
    });
    const adminPage = await adminContext.newPage();
    await adminPage.goto(`/feedback/${feedbackId}`);

    // Wait for the feedback details page to load
    await adminPage.getByText(feedbackTitle).waitFor();
    const feedbackVisibility = adminPage.getByTestId("feedback-visibility");
    await feedbackVisibility.waitFor();
    const dropdownMenuTrigger = feedbackVisibility.getByTestId(
      "feedback-actions-dropdown-button",
    );
    await dropdownMenuTrigger.waitFor();

    // Apply status
    await dropdownMenuTrigger.click();
    await adminPage.getByRole("menuitem", { name: /Apply status/i }).click();
    const statusSubMenu = adminPage.getByTestId("apply-status-dropdown-menu");
    await statusSubMenu.waitFor();
    await statusSubMenu.getByRole("menuitem", { name: /In Progress/i }).click();

    // click away
    await adminPage.click("body");
    await adminPage.waitForTimeout(1000);

    // Apply priority
    await dropdownMenuTrigger.click();
    await adminPage.getByRole("menuitem", { name: /Apply priority/i }).click();
    const prioritySubMenu = adminPage.getByTestId(
      "apply-priority-dropdown-menu",
    );
    await prioritySubMenu.waitFor();
    await prioritySubMenu.getByRole("menuitem", { name: /High/i }).click();

    // click away
    await adminPage.click("body");
    await adminPage.waitForTimeout(1000);
    // Apply type
    await dropdownMenuTrigger.click();
    await adminPage.getByRole("menuitem", { name: /Apply type/i }).click();
    const typeSubMenu = adminPage.getByTestId("apply-type-dropdown-menu");
    await typeSubMenu.waitFor();
    await typeSubMenu
      .getByRole("menuitem", { name: /Feature Request/i })
      .click();

    // click away
    await adminPage.click("body");
    await adminPage.waitForTimeout(1000);
    // Verify updates are visible
    expect(
      await adminPage.getByTestId("feedback-status-badge").textContent(),
    ).toBe("In Progress");
    expect(
      await adminPage.getByTestId("feedback-priority-badge").textContent(),
    ).toBe("High");
    expect(
      await adminPage.getByTestId("feedback-type-badge").textContent(),
    ).toBe("Feature Request");

    await adminContext.close();
  });

  test("Admin can add a comment", async ({ browser }) => {
    const adminContext = await browser.newContext({
      storageState: "playwright/.auth/app_admin.json",
    });
    const adminPage = await adminContext.newPage();
    await adminPage.goto(`/feedback/${feedbackId}`);

    const commentText = Chance().sentence();
    await adminPage.getByPlaceholder("Type your message here.").click();
    await adminPage
      .getByPlaceholder("Type your message here.")
      .fill(commentText);
    await adminPage.getByRole("button", { name: "Add Comment" }).click();

    // Verify comment is visible
    await adminPage.getByText(commentText).waitFor();
    await adminContext.close();
  });
});
