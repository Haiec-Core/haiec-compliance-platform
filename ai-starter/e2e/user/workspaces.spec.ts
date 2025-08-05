import { expect, test } from "@playwright/test";
import { Chance } from "chance";
import { matchPathMaybeLocale } from "../_helpers/utils";
import {
  goToWorkspaceArea,
  matchPathAndExtractWorkspaceInfo,
} from "../_helpers/workspace.helper";

test.describe.serial("Solo Workspace", () => {
  let workspaceSlug: string;
  let isSoloWorkspace: boolean;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("/dashboard");
    const workspaceInfo = await matchPathAndExtractWorkspaceInfo({ page });
    workspaceSlug = workspaceInfo.workspaceSlug;
    isSoloWorkspace = workspaceInfo.isSoloWorkspace;
    await context.close();
  });

  test("should navigate to workspace settings", async ({ page }) => {
    await goToWorkspaceArea({
      page,
      area: "settings",
      workspaceSlug,
      isSoloWorkspace,
    });
    await expect(
      page.getByRole("heading", { name: "Edit Workspace Title" }),
    ).toBeVisible();
  });

  // test("should list team members", async ({ page }) => {
  //   await goToWorkspaceArea({
  //     page,
  //     area: "settings/members",
  //     workspaceSlug,
  //     isSoloWorkspace,
  //   });
  //   await expect(
  //     page.getByRole("heading", { name: "Team Members" }),
  //   ).toBeVisible();
  //   await expect(page.getByTestId("members-table")).toBeVisible();
  // });

  test("should update workspace title and slug", async ({ page }) => {
    await goToWorkspaceArea({
      page,
      area: "settings",
      workspaceSlug,
      isSoloWorkspace,
    });

    const newTitle = new Chance().word();
    const titleInput = page.getByTestId("edit-workspace-title-input");
    await titleInput.clear();
    await titleInput.fill(newTitle);

    // Wait for the slug to be automatically generated
    await page.waitForTimeout(500);

    await page.getByRole("button", { name: "Update" }).click();

    // // Wait for the update request to complete
    // await expect(
    //   page.getByText("Workspace updated successfully"),
    // ).toBeVisible();

    // Then verify the new value
    await expect(async () => {
      const workspaceNameElement = await page.waitForSelector(
        "[data-testid='workspaceName']",
        {
          state: "attached",
        },
      );
      const text = await workspaceNameElement.textContent();
      expect(text).toBe(newTitle);
    }).toPass({
      intervals: [1000, 2000, 5000],
      timeout: 15000,
    });
  });
});

test.describe.serial("Team Workspace", () => {
  let workspaceSlug: string;
  let isSoloWorkspace: boolean;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("/dashboard");

    // Create a team workspace
    await page.focus("body");
    await page.keyboard.press("w");
    const form = page.getByTestId("create-workspace-form");
    await form.waitFor();
    await form.locator("input#name").fill("Team Workspace Test");
    const slug = await form.getByTestId("workspace-slug-input").inputValue();
    await form.getByRole("button", { name: "Create Workspace" }).click();

    // Replace waitForURL with matchPathMaybeLocale
    await matchPathMaybeLocale({
      page,
      pathWithoutLocale: `/workspace/${slug}/home`,
    });

    // Extract workspace info
    const workspaceInfo = await matchPathAndExtractWorkspaceInfo({ page });
    workspaceSlug = workspaceInfo.workspaceSlug;
    isSoloWorkspace = workspaceInfo.isSoloWorkspace;
    await context.close();
  });

  test("should navigate to workspace settings", async ({ page }) => {
    await goToWorkspaceArea({
      page,
      area: "settings",
      workspaceSlug,
      isSoloWorkspace,
    });
    await expect(
      page.getByRole("heading", { name: "Edit Workspace Title" }),
    ).toBeVisible();
  });

  test("should list team members", async ({ page }) => {
    await goToWorkspaceArea({
      page,
      area: "settings/members",
      workspaceSlug,
      isSoloWorkspace,
    });
    await expect(
      page.getByRole("heading", { name: "Team Members" }),
    ).toBeVisible();
    await expect(page.getByTestId("members-table")).toBeVisible();
  });

  test("should update workspace title and slug", async ({ page, context }) => {
    await goToWorkspaceArea({
      page,
      area: "settings",
      workspaceSlug,
      isSoloWorkspace,
    });

    const newTitle = new Chance().word();
    const titleInput = page.getByTestId("edit-workspace-title-input");
    await titleInput.clear();
    await titleInput.fill(newTitle);

    // Wait for the slug to be automatically generated
    await page.waitForTimeout(500);
    // get slug
    const newSlug = await page
      .getByTestId("edit-workspace-slug-input")
      .inputValue();

    await page.getByRole("button", { name: "Update" }).click();

    const page2 = await context.newPage();
    await page2.goto(`/workspace/${newSlug}/home`);

    // More robust verification with increased timeout and intervals
    await expect(async () => {
      const workspaceNameElement = await page2.waitForSelector(
        "[data-testid='workspaceName']",
        {
          state: "attached",
          timeout: 30000,
        },
      );
      const text = await workspaceNameElement.textContent();
      expect(text).toBe(newTitle);
    }).toPass({
      intervals: [2000, 5000, 10000],
      timeout: 30000,
    });
    await page2.close();
  });
});
