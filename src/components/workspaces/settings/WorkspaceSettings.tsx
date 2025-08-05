import { Typography } from "@/components/ui/Typography";
import {
  getCachedLoggedInUserWorkspaceRole,
  getCachedWorkspaceBySlug,
} from "@/rsc-data/user/workspaces";
import type { Metadata } from "next";
import { Suspense } from "react";
import { DeleteWorkspace } from "./DeleteWorkspace";
import { EditWorkspaceForm } from "./EditWorkspaceForm";
import { SetDefaultWorkspacePreference } from "./SetDefaultWorkspacePreference";
import { SettingsFormSkeleton } from "./SettingsSkeletons";

async function EditWorkspace({ workspaceSlug }: { workspaceSlug: string }) {
  const workspace = await getCachedWorkspaceBySlug(workspaceSlug);
  return <EditWorkspaceForm workspace={workspace} />;
}

async function AdminDeleteWorkspace({
  workspaceId,
  workspaceName,
}: {
  workspaceId: string;
  workspaceName: string;
}) {
  const workspaceRole = await getCachedLoggedInUserWorkspaceRole(workspaceId);
  const isWorkspaceAdmin =
    workspaceRole === "admin" || workspaceRole === "owner";
  if (!isWorkspaceAdmin) {
    return null;
  }
  return (
    <DeleteWorkspace workspaceId={workspaceId} workspaceName={workspaceName} />
  );
}

export const metadata: Metadata = {
  title: "Settings",
  description: "You can edit your organization's settings here.",
};

export async function WorkspaceSettings({
  workspaceSlug,
}: {
  workspaceSlug: string;
}) {
  const workspace = await getCachedWorkspaceBySlug(workspaceSlug);
  const workspaceRole = await getCachedLoggedInUserWorkspaceRole(workspace.id);
  const isWorkspaceAdmin =
    workspaceRole === "admin" || workspaceRole === "owner";

  // For now, in this starter kit, we're allowing all users to edit the workspace settings except for the read-only members
  const canEditWorkspace =
    workspaceRole === "admin" ||
    workspaceRole === "owner" ||
    workspaceRole === "member";

  return (
    <div className="space-y-4">
      <div>
        <Typography.H2>Workspace Settings</Typography.H2>
        <Typography.Subtle>
          {isWorkspaceAdmin
            ? "Manage your workspace settings and preferences."
            : "View and manage your workspace preferences."}
        </Typography.Subtle>
      </div>

      {canEditWorkspace && (
        <>
          <Suspense fallback={<SettingsFormSkeleton />}>
            <EditWorkspace workspaceSlug={workspaceSlug} />
          </Suspense>
        </>
      )}

      {isWorkspaceAdmin && (
        <Suspense>
          <AdminDeleteWorkspace
            workspaceId={workspace.id}
            workspaceName={workspace.name}
          />
        </Suspense>
      )}

      <Suspense fallback={<SettingsFormSkeleton />}>
        <SetDefaultWorkspacePreference workspaceSlug={workspaceSlug} />
      </Suspense>
    </div>
  );
}
