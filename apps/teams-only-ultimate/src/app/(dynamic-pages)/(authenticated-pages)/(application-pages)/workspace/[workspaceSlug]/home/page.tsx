import { DashboardLoadingFallback } from "@/components/workspaces/DashboardLoadingFallback";
import { WorkspaceDashboard } from "@/components/workspaces/WorkspaceDashboard";
import { getCachedWorkspaceBySlug } from "@/rsc-data/user/workspaces";
import { workspaceSlugParamSchema } from "@/utils/zod-schemas/params";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(props: {
  params: Promise<unknown>;
}): Promise<Metadata> {
  const params = await props.params;
  const { workspaceSlug } = workspaceSlugParamSchema.parse(params);
  const workspace = await getCachedWorkspaceBySlug(workspaceSlug);

  return {
    title: `Dashboard | ${workspace.name}`,
    description: `View your projects and team members for ${workspace.name}`,
  };
}

export default async function WorkspaceDashboardPage(props: {
  params: Promise<unknown>;
  searchParams: Promise<unknown>;
}) {
  const params = await props.params;
  const { workspaceSlug } = workspaceSlugParamSchema.parse(params);

  return (
    <Suspense fallback={<DashboardLoadingFallback />}>
      <WorkspaceDashboard workspaceSlug={workspaceSlug} />
    </Suspense>
  );
}
