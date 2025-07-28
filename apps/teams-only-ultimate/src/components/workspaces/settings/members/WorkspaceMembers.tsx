import { T } from "@/components/ui/Typography";
import { Card } from "@/components/ui/card";
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getPendingInvitationsInWorkspace,
  getWorkspaceTeamMembers,
} from "@/data/user/workspaces";
import {
  getCachedLoggedInUserWorkspaceRole,
  getCachedWorkspaceBySlug,
} from "@/rsc-data/user/workspaces";
import type {
  TeamMembersTableProps,
  WorkspaceWithMembershipType,
} from "@/types";
import {
  serverGetLoggedInUserVerified
} from "@/utils/server/serverGetLoggedInUser";
import { MoreHorizontal } from "lucide-react";
import moment from "moment";
import type { Metadata } from "next";
import { Suspense } from "react";
import { EditMemberRoleDialog } from "./EditMemberRoleDialog";
import { InviteUser } from "./InviteUser";
import {
  LeaveWorkspaceConditions,
  LeaveWorkspaceDialog,
} from "./LeaveWorkspaceDialog";
import { RemoveMemberDialog } from "./RemoveMemberDialog";
import { RevokeInvitationDialog } from "./RevokeInvitationDialog";

export const metadata: Metadata = {
  title: "Members",
  description: "You can edit your workspace's members here.",
};

async function TeamMembers({
  workspace,
}: {
  workspace: WorkspaceWithMembershipType;
}) {
  const members = await getWorkspaceTeamMembers(workspace.id);
  const user = await serverGetLoggedInUserVerified();
  const workspaceRole = await getCachedLoggedInUserWorkspaceRole(workspace.id);
  const isWorkspaceAdmin =
    workspaceRole === "admin" || workspaceRole === "owner";
  const normalizedMembers: TeamMembersTableProps["members"] = members.map(
    (member, index) => {
      const userProfile = Array.isArray(member.user_profiles)
        ? member.user_profiles[0]
        : member.user_profiles;
      if (!userProfile) {
        throw new Error("User profile not found");
      }
      return {
        index: index + 1,
        id: userProfile.id,
        name: userProfile.full_name ?? `User ${userProfile.id}`,
        role: member.workspace_member_role,
        created_at: moment(member.added_at).format("DD MMM YYYY"),
      };
    },
  );

  return (
    <div className="space-y-4 max-w-4xl">
      <div className="flex justify-between items-center">
        <T.H3>Team Members</T.H3>
        {isWorkspaceAdmin ? <InviteUser workspace={workspace} /> : null}
      </div>

      <Card>
        <ShadcnTable data-testid="members-table">
          <TableHeader>
            <TableRow>
              <TableHead> # </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined On</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {normalizedMembers.map((member, index) => {
              const isMemberCurrentUser = member.id === user.id;
              // If the user is a workspace admin, then they can perform a few actions.
              // If ther user is not a workspace admin, they only have actions on themselves.
              const shouldShowActions = isWorkspaceAdmin || isMemberCurrentUser;

              const isLastAdmin =
                isWorkspaceAdmin &&
                normalizedMembers.filter(
                  (m) => m.role === "admin" || m.role === "owner",
                ).length === 1;

              // if you are not a workspace admin, you can leave anytime.
              // if you are a workspace admin, you can leave if you are not the last admin.
              const leaveConditions: LeaveWorkspaceConditions =
                isWorkspaceAdmin && isLastAdmin
                  ? "DISABLED_IS_LAST_ADMIN"
                  : "ENABLED";

              return (
                <TableRow data-user-id={member.id} key={member.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell data-testid={"member-name"}>
                    {member.name}
                  </TableCell>
                  <TableCell data-testid={"member-role"} className="capitalize">
                    {member.role}
                  </TableCell>
                  <TableCell>{member.created_at}</TableCell>
                  <TableCell>
                    {shouldShowActions ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {isWorkspaceAdmin && member.id !== user.id && (
                            <>
                              <EditMemberRoleDialog
                                workspaceId={workspace.id}
                                memberId={member.id}
                                currentRole={member.role}
                              />
                              <RemoveMemberDialog
                                workspaceId={workspace.id}
                                memberId={member.id}
                                memberName={
                                  member.name ?? `Member ${member.id}`
                                }
                              />
                            </>
                          )}
                          {member.id === user.id && (
                            <LeaveWorkspaceDialog
                              workspaceId={workspace.id}
                              memberId={member.id}
                              leaveConditions={leaveConditions}
                            />
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : null}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </ShadcnTable>
      </Card>
    </div>
  );
}

async function TeamInvitations({
  workspace,
}: {
  workspace: WorkspaceWithMembershipType;
}) {
  const [invitations, workspaceRole] = await Promise.all([
    getPendingInvitationsInWorkspace(workspace.id),
    getCachedLoggedInUserWorkspaceRole(workspace.id),
  ]);
  const normalizedInvitations = invitations.map((invitation, index) => {
    return {
      index: index + 1,
      id: invitation.id,
      email: invitation.invitee_user_email,
      created_at: moment(invitation.created_at).format("DD MMM YYYY"),
      status: invitation.status,
    };
  });

  if (!normalizedInvitations.length) {
    return (
      <div className="space-y-4 max-w-4xl">
        <T.H3>Invitations</T.H3>
        <T.Subtle>No pending invitations</T.Subtle>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-4xl">
      <T.H3>Invitations</T.H3>
      <div className="shadow-xs border rounded-lg overflow-hidden">
        <ShadcnTable>
          <TableHeader>
            <TableRow>
              <TableHead scope="col"> # </TableHead>
              <TableHead scope="col">Email</TableHead>
              <TableHead scope="col">Sent On</TableHead>
              <TableHead scope="col">Status</TableHead>
              {workspaceRole === "admin" || workspaceRole === "owner" ? (
                <TableHead scope="col">Actions</TableHead>
              ) : null}
            </TableRow>
          </TableHeader>
          <TableBody>
            {normalizedInvitations.map((invitation, index) => {
              return (
                <TableRow key={invitation.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{invitation.email}</TableCell>
                  <TableCell>{invitation.created_at}</TableCell>
                  <TableCell className="uppercase">
                    <Badge
                      variant={
                        invitation.status === "active" ? "secondary" : "default"
                      }
                    >
                      {invitation.status === "active"
                        ? "pending"
                        : invitation.status}
                    </Badge>
                  </TableCell>
                  {workspaceRole === "admin" || workspaceRole === "owner" ? (
                    <TableCell>
                      <RevokeInvitationDialog invitationId={invitation.id} />
                    </TableCell>
                  ) : null}
                </TableRow>
              );
            })}
          </TableBody>
        </ShadcnTable>
      </div>
    </div>
  );
}

export async function WorkspaceMembers({
  workspaceSlug,
}: {
  workspaceSlug: string;
}) {
  const workspace = await getCachedWorkspaceBySlug(workspaceSlug);
  return (
    <div className="space-y-12">
      <Suspense fallback={<T.Subtle>Loading team members...</T.Subtle>}>
        <TeamMembers workspace={workspace} />
      </Suspense>
      <Suspense fallback={<T.Subtle>Loading team invitations...</T.Subtle>}>
        <TeamInvitations workspace={workspace} />
      </Suspense>
    </div>
  );
}
