import { DashboardClientWrapper } from "@/components/workspaces/DashboardClientWrapper";
import { ProjectsLoadingFallback } from "@/components/workspaces/ProjectsLoadingFallback";
import { ProjectsTable } from "@/components/workspaces/projects/ProjectsTable";
import {
  getCachedLoggedInUserWorkspaceRole,
  getCachedWorkspaceBySlug,
} from "@/rsc-data/user/workspaces";
import { workspaceSlugParamSchema } from "@/utils/zod-schemas/params";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Projects",
  description: "View and manage your workspace projects",
};

export default async function Page(props: { params: Promise<unknown> }) {
  const params = await props.params;
  const { workspaceSlug } = workspaceSlugParamSchema.parse(params);

  const workspace = await getCachedWorkspaceBySlug(workspaceSlug);
  const workspaceRole = await getCachedLoggedInUserWorkspaceRole(workspace.id);

  return (
    <DashboardClientWrapper>
      <Suspense fallback={<ProjectsLoadingFallback quantity={3} />}>
        <ProjectsTable
          workspaceId={workspace.id}
          workspaceRole={workspaceRole}
        />
      </Suspense>
    </DashboardClientWrapper>
  );
}
