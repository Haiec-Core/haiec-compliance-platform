"use server";

import { getSlimWorkspaceById } from "@/data/user/workspaces";
import { getCachedProjectBySlug } from "@/rsc-data/user/projects";
import { getCachedLoggedInUserWorkspaceRole } from "@/rsc-data/user/workspaces";
import { ApprovalControlActions } from "./ApprovalControlActions";

async function fetchData(projectSlug: string) {
  const projectByIdData = await getCachedProjectBySlug(projectSlug);
  const [workspaceData, workspaceRole] = await Promise.all([
    getSlimWorkspaceById(projectByIdData.workspace_id),
    getCachedLoggedInUserWorkspaceRole(projectByIdData.workspace_id),
  ]);

  return {
    projectByIdData,
    workspaceRole,
    workspaceData,
  };
}

export async function ApprovalControls({
  projectSlug,
}: {
  projectSlug: string;
}) {
  const data = await fetchData(projectSlug);
  const isOrganizationManager =
    data.workspaceRole === "admin" || data.workspaceRole === "owner";
  const canManage = isOrganizationManager;

  const canOnlyEdit = data.workspaceRole === "member";
  const projectId = data.projectByIdData.id;
  return (
    <ApprovalControlActions
      projectId={projectId}
      projectSlug={projectSlug}
      canManage={canManage}
      canOnlyEdit={canOnlyEdit}
      projectStatus={data.projectByIdData.project_status}
    />
  );
}
