import { ApplicationLayoutShell } from "@/components/ApplicationLayoutShell/ApplicationLayoutShell";
import {
  getCachedSoloWorkspace,
  getCachedWorkspaceBySlug,
} from "@/rsc-data/user/workspaces";
import { Suspense, type ReactNode } from "react";

async function WorkspaceTestIds({
  workspaceSlug,
}: {
  workspaceSlug: string | undefined;
}) {
  const workspace = workspaceSlug
    ? await getCachedWorkspaceBySlug(workspaceSlug)
    : await getCachedSoloWorkspace();

  return (
    <>
      <span className="hidden" data-testid="workspaceId">
        {workspace.id}
      </span>
      <span className="hidden" data-testid="workspaceName">
        {workspace.name}
      </span>
      <span className="hidden" data-testid="workspaceSlug">
        {workspace.slug}
      </span>
      <span className="hidden" data-testid="isSoloWorkspace">
        {workspace.membershipType}
      </span>
    </>
  );
}

export async function WorkspaceLayout({
  children,
  navbar,
  sidebar,
  workspaceSlug,
}: {
  children: ReactNode;
  navbar: ReactNode;
  sidebar: ReactNode;
  // undefined for solo workspace
  workspaceSlug: string | undefined;
}) {
  return (
    <ApplicationLayoutShell sidebar={sidebar}>
      <div>
        <Suspense fallback={null}>
          <WorkspaceTestIds workspaceSlug={workspaceSlug} />
        </Suspense>
        <div className="relative flex-1 h-auto w-full overflow-auto">
          {children}
        </div>
      </div>
    </ApplicationLayoutShell>
  );
}
