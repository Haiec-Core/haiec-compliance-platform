import { expect, type Page } from "@playwright/test";
import { matchPathAndExtractWorkspaceInfo } from "./workspace.helper";

export async function onboardUserHelper({
  page,
  name,
}: {
  page: Page;
  name: string;
}) {
  const acceptTermsButton = page.getByRole("button", {
    name: "Accept Terms",
  });
  await acceptTermsButton.click();

  // Profile Update
  const fullNameInput = page.getByRole("textbox", { name: "Full Name" });
  await expect(fullNameInput).toBeVisible();
  await fullNameInput.fill(name);

  const saveProfileButton = page.getByRole("button", { name: "Save Profile" });
  await saveProfileButton.click();

  const createWorkspaceButton = page.getByRole("button", {
    name: "Continue",
  });
  await createWorkspaceButton.click();

  const { workspaceId } = await matchPathAndExtractWorkspaceInfo({ page });
  expect(workspaceId).not.toBeNull();
}
