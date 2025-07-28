import { expect, test } from "@playwright/test";

test.describe.serial("Anonymous users can view public feedback", () => {
  test("Public feedback is visible on the feedback list page", async ({
    page,
  }) => {
    // Navigate to the public feedback page
    await page.goto("/feedback");

    // Check if the page loads correctly
    await expect(
      page.getByRole("heading", { name: "Community Feedback" }),
    ).toBeVisible();

    // Check if any public feedback is visible
    const feedbackItems = await page.getByTestId("feedback-item").all();

    if (feedbackItems.length > 0) {
      // If there are feedback items, check the first one
      await expect(feedbackItems[0]).toBeVisible();
    }
  });

  test("Anonymous user can view public feedback details", async ({ page }) => {
    // Navigate to the public feedback page
    await page.goto("/feedback");

    // Get all feedback items
    const feedbackItems = await page.getByTestId("feedback-item").all();

    if (feedbackItems.length > 0) {
      await feedbackItems[0].waitFor();
      // Click on the first feedback item
      await feedbackItems[0].click();

      // Wait for the feedback details page to load
      await page.waitForURL(/\/feedback\/[a-zA-Z0-9-]+$/);
      const url = page.url();
      const feedbackId = url.split("/").pop();

      const feedbackVisibility = page.getByTestId("feedback-visibility");
      await expect(feedbackVisibility).toBeVisible();
      // // Check if the feedback details are visible
      await page
        .getByRole("heading", {
          level: 2,
        })
        .waitFor();
      await expect(feedbackVisibility.getByText("Public")).toBeVisible();

      // // Check if comments are visible (if any)
      await expect(
        page.getByRole("heading", {
          name: "Comments",
        }),
      ).toBeVisible();
    } else {
      console.log("No public feedback available to test details view.");
    }
  });
});
