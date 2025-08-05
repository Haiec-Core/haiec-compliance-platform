import { ApplicationLayoutShell } from "@/components/ApplicationLayoutShell/ApplicationLayoutShell";
import { InternalNavbar } from "@/components/NavigationMenu/InternalNavbar";
import {
  getCachedDefaultWorkspace,
  getCachedWorkspaceBySlug
} from "@/rsc-data/user/workspaces";
import { Suspense, type ReactNode } from "react";

async function WorkspaceTestIds({
  workspaceSlug,
}: {
  workspaceSlug: string | undefined;
}) {
  const workspace = workspaceSlug
    ? await getCachedWorkspaceBySlug(workspaceSlug)
    : await getCachedDefaultWorkspace();
  if (!workspace) {
    throw new Error("Could not resolve workspace in workspace layout");
  }
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
        <InternalNavbar>
          <div className="lg:flex w-full justify-between items-center">
            {navbar}
          </div>
        </InternalNavbar>
        <div className="relative flex-1 h-auto w-full overflow-auto">
          <div className="px-6 space-y-6 pb-8">{children}</div>
        </div>
      </div>
    </ApplicationLayoutShell>
  );
}
