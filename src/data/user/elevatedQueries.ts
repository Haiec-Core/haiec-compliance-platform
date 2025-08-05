/**
 * [WARNING: USE SPARINGLY AND ONLY WHEN NECESSARY]
 * These are queries that are selectively run as application admin for convenience.
 * Another option is to harden RLS policies even further for these scenarios. But the drawback
 * is that all those policies which contain select queries across other tables have the tendency to make the
 * queries slower to run. So, we have to be careful about the trade-offs.
 * Use this sparingly and only when necessary and in exceptional scenarios.
 * */
"use server";

import { Json } from "@/lib/database.types";
import { supabaseAdminClient } from "@/supabase-clients/admin/supabaseAdminClient";
import { UserAppMetadata } from "@supabase/supabase-js";

/**
 * [Elevated Query]
 * Get the workspace details for the invitation. This query is elevated to run as application admin.
 * Reason: The user is not yet part of the workspace and hence cannot see the workspace details.
 * Adding an RLS policy to allow inviter to see the workspace details would be a security risk. We could
 * split the workspace table into separate tables for public and private data. But that would make the
 * workspace queries slower to run as they would involve joins across multiple tables.
 * Hence, we selectively run this query as application admin and only within the context of the invitation.
 */
export async function getInvitationWorkspaceDetails(workspaceId: string) {
  const { data, error } = await supabaseAdminClient
    .from("workspaces")
    .select("id, name")
    .eq("id", workspaceId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * [Elevated Query]
 * create notification for all admins
 * Reason: A user is not able to view the list of all admins. Hence, we run this query as application admin.
 * This function is called createAdminNotificationForUserActivity because
 * it is used to notify admins when a logged in user performs an activity.
 * */

/**
 * Creates notifications for all admins when a user performs an activity.
 *
 * @param payload - JSON object containing notification data.
 * @param excludedAdminUserId - (Optional) ID of the admin user to exclude from receiving the notification.
 * @returns Returns a Promise resolving to the notification data.
 */
export const createAdminNotification = async ({
  payload,
  excludedAdminUserId,
}: {
  payload: Json;
  excludedAdminUserId?: string;
}) => {
  async function getAllAdminUserIds() {
    const { data, error } = await supabaseAdminClient
      .from("user_roles")
      .select("user_id")
      .eq("role", "admin");

    if (error) {
      throw error;
    }

    return data.map((row) => row.user_id);
  }
  let adminUserIdsToNotify = await getAllAdminUserIds();

  if (
    excludedAdminUserId &&
    adminUserIdsToNotify.includes(excludedAdminUserId)
  ) {
    adminUserIdsToNotify = adminUserIdsToNotify?.filter(
      (userId) => userId != excludedAdminUserId,
    );
  }

  const { data: notification, error } = await supabaseAdminClient
    .from("user_notifications")
    .insert(
      adminUserIdsToNotify.map((userId) => ({
        user_id: userId,
        payload,
      })),
    );
  if (error) throw error;
  return notification;
};

/**
 * [Elevated Query]
 * Reason: The user details are not visible to anonymous viewers by default.
 * Get user full name and avatar url for anonymous viewers
 * @param userId
 * @returns user full name and avatar url
 */
export const anonGetUserProfile = async (userId: string) => {
  const getUserFullName = async (userId: string) => {
    const { data, error } = await supabaseAdminClient
      .from("user_profiles")
      .select("full_name")
      .eq("id", userId)
      .single();

    if (error) {
      throw error;
    }

    return data.full_name;
  };

  const getUserAvatarUrl = async (userId: string) => {
    const { data, error } = await supabaseAdminClient
      .from("user_profiles")
      .select("avatar_url")
      .eq("id", userId)
      .single();

    if (error) {
      throw error;
    }

    return data.avatar_url;
  };

  const [fullName, avatarUrl] = await Promise.all([
    getUserFullName(userId),
    getUserAvatarUrl(userId),
  ]);

  return { fullName, avatarUrl };
};

/**
 * [Elevated Query]
 * Add user creator as workspace owner
 * This is a workaround to the issue that the workspace owner cannot be set to the user who created the workspace
 * because the user who created the workspace is not yet part of the workspace. Since managing workspace settings
 * are protected by RLS policies, we need to add the user who created the workspace as the workspace owner.
 */
export const addUserAsWorkspaceOwner = async ({
  workspaceId,
  userId,
}: {
  workspaceId: string;
  userId: string;
}) => {
  const { data, error } = await supabaseAdminClient
    .from("workspace_members")
    .insert({
      workspace_id: workspaceId,
      workspace_member_id: userId,
      workspace_member_role: "owner",
    });

  if (error) {
    throw error;
  }

  return data;
};

/**
 * [Elevated Query]
 * Update workspace membership type
 * Reason: The user is not able to update the workspace membership type since whether a workspace should be solo or team depends on several factors which should
 * not be in the organization admin control.
 *
 * This helper should be used to make a workspace solo or team.
 */
export const updateWorkspaceMembershipType = async ({
  workspaceId,
  workspaceMembershipType,
}: {
  workspaceId: string;
  workspaceMembershipType: "solo" | "team";
}) => {
  const { data, error } = await supabaseAdminClient
    .from("workspace_application_settings")
    .update({
      membership_type: workspaceMembershipType,
    })
    .eq("workspace_id", workspaceId);

  if (error) {
    throw error;
  }

  return data;
};

/**
 * [Elevated Query]
 * Update user app metadata
 * Reason: This can only be done using supabaseAdminClient
 */
export const updateUserAppMetadata = async ({
  userId,
  appMetadata,
}: {
  userId: string;
  appMetadata: UserAppMetadata;
}) => {
  const { data, error } = await supabaseAdminClient.auth.admin.updateUserById(
    userId,
    { user_metadata: appMetadata },
  );
  if (error) {
    throw error;
  }
  return data;
};

/**
 * [Elevated Query]
 * Update user workspace role
 * Reason: Only workspace admins can update the user workspace role.
 * This is to prevent a non admin user from updating the role of another user in the workspace.
 */
export const acceptWorkspaceInvitation = async ({
  invitationId,
  userId,
}: {
  invitationId: string;
  userId: string;
}) => {
  const { data: invitation, error: invitationError } = await supabaseAdminClient
    .from("workspace_invitations")
    .update({
      status: "finished_accepted",
      invitee_user_id: userId,
    })
    .eq("id", invitationId)
    .select("*")
    .single();

  if (invitationError) {
    throw new Error(invitationError.message);
  }
  return invitation;
};

export const declineWorkspaceInvitation = async ({
  invitationId,
  userId,
}: {
  invitationId: string;
  userId: string;
}) => {
  const { data: invitation, error: invitationError } = await supabaseAdminClient
    .from("workspace_invitations")
    .update({
      status: "finished_declined",
      invitee_user_id: userId,
    })
    .eq("id", invitationId)
    .select("*")
    .single();

  if (invitationError) {
    throw new Error(invitationError.message);
  }
  return invitation;
};
