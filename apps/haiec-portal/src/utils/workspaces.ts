import { Enum, SlimWorkspace } from "@/types";
import urlJoin from "url-join";

function isWorkspace(
  arg: SlimWorkspace | Enum<"workspace_membership_type">,
): arg is SlimWorkspace {
  return typeof arg === "object" && "membershipType" in arg;
}

export function getWorkspaceSubPath(
  workspace: SlimWorkspace,
  subPath: string,
): string;
export function getWorkspaceSubPath(
  workspaceSlug: Enum<"workspace_membership_type">,
  subPath: string,
): string;
export function getWorkspaceSubPath(
  arg: SlimWorkspace | Enum<"workspace_membership_type">,
  subPath: string,
): string {
  if (isWorkspace(arg)) {
    const workspace = arg;
    if (workspace.membershipType === "solo") {
      // TODO: solo workspaces are the root workspace, so we don't need to include the workspace slug
      // remove the workspace slug from the subpath
      return urlJoin(`/`, subPath);
    }
    return urlJoin(`/workspace/${workspace.slug}`, subPath);
  }
  return urlJoin(`/workspace/${arg}`, subPath);
}

export function getIsWorkspaceAdmin(
  workspaceRole: Enum<"workspace_member_role_type">,
) {
  return workspaceRole === "admin" || workspaceRole === "owner";
}

export function getIsReadOnlyMember(
  workspaceRole: Enum<"workspace_member_role_type">,
) {
  return workspaceRole === "readonly";
}
