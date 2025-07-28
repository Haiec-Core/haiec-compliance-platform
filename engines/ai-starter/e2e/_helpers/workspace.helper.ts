import type { Page } from "@playwright/test";

export async function extractInfoFromWorkspaceDashboard({
  page,
}: {
  page: Page;
}): Promise<{
  workspaceId: string;
  workspaceSlug: string;
  isSoloWorkspace: boolean;
}> {
  const workspaceId = await page.getByTestId("workspaceId").textContent();
  const workspaceSlug = await page.getByTestId("workspaceSlug").textContent();
  if (!workspaceId || !workspaceSlug) {
    throw new Error("Workspace information not found");
  }

  const workspaceMembershipType = await page
    .getByTestId("isSoloWorkspace")
    .textContent();
  const isSoloWorkspace = workspaceMembershipType === "solo";

  return { workspaceId, workspaceSlug, isSoloWorkspace };
}

export async function matchPathAndExtractWorkspaceInfo({
  page,
}: {
  page: Page;
}): Promise<{
  workspaceId: string;
  workspaceSlug: string;
  isSoloWorkspace: boolean;
}> {
  // Wait for the URL to end with '/home'
  await page.waitForURL((url) => url.pathname.endsWith("/home"));
  return await extractInfoFromWorkspaceDashboard({ page });
}

export async function getDefaultWorkspaceInfoHelper({
  page,
}: {
  page: Page;
}): Promise<{
  workspaceId: string;
  workspaceSlug: string;
  isSoloWorkspace: boolean;
}> {
  await page.goto("/dashboard");
  return await matchPathAndExtractWorkspaceInfo({ page });
}

export async function goToWorkspaceArea({
  page,
  area,
  workspaceSlug,
  isSoloWorkspace,
}: {
  page: Page;
  area: "home" | "settings" | "members" | "billing" | "settings/members";
  workspaceSlug: string;
  isSoloWorkspace: boolean;
}): Promise<void> {
  const areaPath = area.startsWith("/") ? area : `/${area}`;
  if (isSoloWorkspace) {
    await page.goto(areaPath);
  } else {
    await page.goto(`/workspace/${workspaceSlug}${areaPath}`);
  }
}
