import { DashboardLoadingFallback } from "@/components/workspaces/DashboardLoadingFallback";
import { WorkspaceDashboard } from "@/components/workspaces/WorkspaceDashboard";
import { getCachedSoloWorkspace } from "@/rsc-data/user/workspaces";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const workspace = await getCachedSoloWorkspace();

  return {
    title: `${workspace.name} | Workspace Dashboard`,
    description: `View your projects and team members for ${workspace.name}`,
  };
}

export default async function WorkspaceDashboardPage({
  searchParams,
}: {
  searchParams: unknown;
}) {
  const workspace = await getCachedSoloWorkspace();
  return (
    <Suspense fallback={<DashboardLoadingFallback />}>
      <WorkspaceDashboard
        workspaceSlug={workspace.slug}
      />
    </Suspense>
  );
}
