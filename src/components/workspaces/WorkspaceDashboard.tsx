import {
  getCachedLoggedInUserWorkspaceRole,
  getCachedWorkspaceBySlug,
} from "@/rsc-data/user/workspaces";
import type { Metadata } from "next";
import { Suspense } from "react";
import { DashboardClientWrapper } from "./DashboardClientWrapper";
import { ProjectsLoadingFallback } from "./ProjectsLoadingFallback";
import { WorkspaceGraphs } from "./graphs/WorkspaceGraphs";
import { ProjectsTable } from "./projects/ProjectsTable";

export type DashboardProps = {
  workspaceSlug: string;
};

export async function WorkspaceDashboard({ workspaceSlug }: DashboardProps) {
  const workspace = await getCachedWorkspaceBySlug(workspaceSlug);
  const workspaceRole = await getCachedLoggedInUserWorkspaceRole(workspace.id);

  return (
    <DashboardClientWrapper>
      <WorkspaceGraphs />
      <Suspense fallback={<ProjectsLoadingFallback quantity={3} />}>
        <ProjectsTable
          workspaceId={workspace.id}
          workspaceRole={workspaceRole}
        />
      </Suspense>
    </DashboardClientWrapper>
  );
}

export async function generateMetadata({
  workspaceSlug,
}: DashboardProps): Promise<Metadata> {
  const workspace = await getCachedWorkspaceBySlug(workspaceSlug);

  return {
    title: `Dashboard | ${workspace.name}`,
    description: `View your projects and team members for ${workspace.name}`,
  };
}
