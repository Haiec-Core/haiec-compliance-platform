import { getCachedWorkspaceBySlug } from "@/rsc-data/user/workspaces";
import type { Metadata } from "next";
import { DashboardClientWrapper } from "./DashboardClientWrapper";
import { WorkspaceChat } from "./WorkspaceChat";


export type DashboardProps = {
  workspaceSlug: string;
};

export async function WorkspaceDashboard({
  workspaceSlug,
}: DashboardProps) {
  const workspace = await getCachedWorkspaceBySlug(workspaceSlug);
  return (
    <DashboardClientWrapper>
      <WorkspaceChat workspaceId={workspace.id} />
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
