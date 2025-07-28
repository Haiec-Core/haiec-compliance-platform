import { expect, test } from "@playwright/test";
import Chance from "chance";

test.describe.serial("Users can submit and view submitted feedback", () => {
  let feedbackId: string | undefined = undefined;
  const feedbackTitle = Chance().sentence();
  const feedbackDescription = Chance().sentence();

  test("User can open feedback dialog and submit feedback", async ({
    page,
  }) => {
    // Navigate to the dashboard
    await page.goto("/dashboard");
    await page.getByTestId("sidebar-user-nav-avatar-button").click();
    await page.getByRole("menuitem", { name: "Feedback" }).click();
    await page.getByTestId("feedback-heading-actions-trigger").click();
    await page.getByRole("button", { name: "Create Feedback" }).click();
    await page.getByTestId("feedback-title-input").fill(feedbackTitle);
    await page.getByTestId("feedback-title-input").press("Tab");
    await page.getByTestId("feedback-content-input").fill(feedbackDescription);
    await page.getByTestId("submit-feedback-button").click();
    await expect(
      page.getByRole("heading", { name: feedbackTitle }),
    ).toBeVisible();

    // Submit the feedback

    // Wait for the success toast
    await page.waitForURL(/\/feedback\/[a-zA-Z0-9-]+$/);
    const url = await page.url();
    feedbackId = url.split("/").pop();
    expect(feedbackId).toBeDefined();
    if (!feedbackId) {
      throw new Error("Feedback ID not found");
    }
  });

  test("Created feedback is visible on the feedback list page", async ({
    page,
  }) => {
    // Navigate to the feedback page
    await page.goto(`/feedback`);

    // Check if the recently created feedback is visible
    await expect(page.getByText(feedbackTitle)).toBeVisible();
    await expect(page.getByText(feedbackDescription)).toBeVisible();
  });

  test("User can view feedback details", async ({ page }) => {
    // Navigate to the feedback page
    await page.goto(`/feedback/${feedbackId}`);

    // Wait for the feedback details page to load
    await page.getByText(feedbackTitle).waitFor();

    // Check if the feedback details are visible
    await expect(page.getByText(feedbackDescription)).toBeVisible();
  });

  test("User can add a comment to feedback and view it", async ({ page }) => {
    // Navigate to the feedback page
    await page.goto(`/feedback/${feedbackId}`);

    await page.waitForLoadState("networkidle");
    const commentText = Chance().sentence();

    await page.getByPlaceholder("Type your message here.").click();
    await page.getByPlaceholder("Type your message here.").fill(commentText);
    await page.getByRole("button", { name: "Add Comment" }).click();

    const commentsList = page.getByTestId("logged-in-user-feedback-comments");
    // find the li > p which has the text of the comment
    await commentsList.getByText(commentText).waitFor();
  });
});
