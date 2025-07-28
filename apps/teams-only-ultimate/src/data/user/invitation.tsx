"use server";
import { authActionClient } from "@/lib/safe-action";
import { supabaseAdminClient } from "@/supabase-clients/admin/supabaseAdminClient";
import { createSupabaseUserServerActionClient } from "@/supabase-clients/user/createSupabaseUserServerActionClient";
import { createSupabaseUserServerComponentClient } from "@/supabase-clients/user/createSupabaseUserServerComponentClient";
import { WorkspaceInvitation } from "@/types";
import { sendEmail } from "@/utils/api-routes/utils";
import { toSiteURL } from "@/utils/helpers";
import { serverGetLoggedInUserVerified } from "@/utils/server/serverGetLoggedInUser";
import { getWorkspaceSubPath } from "@/utils/workspaces";
import { renderAsync } from "@react-email/render";
import TeamInvitationEmail from "emails/TeamInvitation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  acceptWorkspaceInvitation,
  declineWorkspaceInvitation,
  getInvitationWorkspaceDetails,
} from "./elevatedQueries";
import {
  createAcceptedWorkspaceInvitationNotification,
  createNotification,
} from "./notifications";
import { getUserProfile } from "./user";
import { getWorkspaceById } from "./workspaces";

// This function allows an application admin with service_role
// to check if a user with a given email exists in the auth.users table
const appAdminGetUserIdByEmail = async (
  email: string,
): Promise<string | null> => {
  const { data, error } = await supabaseAdminClient
    .from("user_application_settings")
    .select("*")
    .eq("email_readonly", email);

  if (error) {
    throw error;
  }

  if (data.length === 0) {
    return null;
  }

  return data[0].id;
};

async function setupInviteeUserDetails(email: string): Promise<{
  type: "USER_CREATED" | "USER_EXISTS";
  userId: string;
}> {
  const inviteeUserId = await appAdminGetUserIdByEmail(email);
  /**
   * User does not exist in auth.users table, create a new user
   */
  if (!inviteeUserId) {
    const { data, error } = await supabaseAdminClient.auth.admin.createUser({
      email: email,
    });
    if (error) {
      throw error;
    }
    return {
      type: "USER_CREATED",
      userId: data.user.id,
    };
  }

  return {
    type: "USER_EXISTS",
    userId: inviteeUserId,
  };
}

async function getMagicLink(email: string): Promise<string> {
  const response = await supabaseAdminClient.auth.admin.generateLink({
    email,
    type: "magiclink",
  });

  if (response.error) {
    throw response.error;
  }

  const generateLinkData = response.data;

  if (generateLinkData) {
    const {
      properties: { hashed_token },
    } = generateLinkData;

    if (process.env.NEXT_PUBLIC_SITE_URL !== undefined) {
      // change the origin of the link to the site url

      const tokenHash = hashed_token;
      const searchParams = new URLSearchParams({
        token_hash: tokenHash,
        next: "/dashboard",
      });

      const url = new URL(process.env.NEXT_PUBLIC_SITE_URL);
      url.pathname = `/auth/confirm`;
      url.search = searchParams.toString();

      return url.toString();
    } else {
      throw new Error("Site URL is not defined");
    }
  } else {
    throw new Error("No data returned");
  }
}

async function getViewInvitationUrl(
  invitationId: string,
  inviteeDetails: {
    type: "USER_CREATED" | "USER_EXISTS";
    userId: string;
  },
  email: string,
): Promise<string> {
  if (inviteeDetails.type === "USER_CREATED") {
    const magicLink = await getMagicLink(email);
    return magicLink;
  }

  return toSiteURL("/api/invitations/view/" + invitationId);
}

const createInvitationSchema = z.object({
  workspaceId: z.string().uuid(),
  email: z.string().email(),
  role: z.enum(["admin", "member", "readonly"]), // Assuming these are the possible roles
});

export const createInvitationAction = authActionClient
  .schema(createInvitationSchema)
  .action(
    async ({ parsedInput: { workspaceId, email, role }, ctx: { userId } }) => {
      const supabaseClient = await createSupabaseUserServerActionClient();

      // Check if organization exists
      const { data: workspace, error: workspaceError } = await supabaseClient
        .from("workspaces")
        .select("*")
        .eq("id", workspaceId)
        .single();

      if (workspaceError) {
        throw new Error(workspaceError.message);
      }

      const inviteeUserDetails = await setupInviteeUserDetails(email);

      // Check if already invited
      const { data: existingInvitations, error: existingInvitationError } =
        await supabaseClient
          .from("workspace_invitations")
          .select("*")
          .eq("invitee_user_id", inviteeUserDetails.userId)
          .eq("inviter_user_id", userId)
          .eq("status", "active")
          .eq("workspace_id", workspaceId);

      if (existingInvitationError) {
        throw new Error(existingInvitationError.message);
      }

      if (existingInvitations.length > 0) {
        throw new Error("User already invited");
      }

      // Create invitation
      const { data: invitation, error: invitationError } = await supabaseClient
        .from("workspace_invitations")
        .insert({
          invitee_user_email: email,
          invitee_user_id: inviteeUserDetails.userId,
          inviter_user_id: userId,
          status: "active",
          workspace_id: workspaceId,
          invitee_user_role: role,
        })
        .select("*")
        .single();

      if (invitationError) {
        throw new Error(invitationError.message);
      }

      const viewInvitationUrl = await getViewInvitationUrl(
        invitation.id,
        inviteeUserDetails,
        email,
      );

      const { data: userProfile, error: userProfileError } =
        await supabaseClient
          .from("user_profiles")
          .select("*")
          .eq("id", userId)
          .single();

      if (userProfileError) {
        throw new Error(userProfileError.message);
      }

      const inviterName = userProfile?.full_name || `User [${userProfile?.id}]`;

      // Send email
      const invitationEmailHTML = await renderAsync(
        <TeamInvitationEmail
          viewInvitationUrl={viewInvitationUrl}
          inviterName={inviterName}
          isNewUser={inviteeUserDetails.type === "USER_CREATED"}
          workspaceName={workspace.name}
        />,
      );

      await sendEmail({
        to: email,
        subject: `Invitation to join ${workspace.name}`,
        html: invitationEmailHTML,
        from: process.env.ADMIN_EMAIL,
      });

      // Create notification
      await createNotification(inviteeUserDetails.userId, {
        type: "invitedToWorkspace",
        inviterFullName: inviterName,
        workspaceId: workspaceId,
        workspaceName: workspace.name,
        invitationId: invitation.id,
      });
      revalidatePath("/user/invitations");
      return invitation;
    },
  );

const acceptInvitationSchema = z.object({
  invitationId: z.string(),
});

export const acceptInvitationAction = authActionClient
  .schema(acceptInvitationSchema)
  .action(async ({ parsedInput: { invitationId }, ctx: { userId } }) => {
    const invitation = await acceptWorkspaceInvitation({
      invitationId,
      userId,
    });

    const userProfile = await getUserProfile(userId);
    const workspace = await getWorkspaceById(invitation.workspace_id);

    await createAcceptedWorkspaceInvitationNotification(
      invitation.inviter_user_id,
      {
        workspaceId: invitation.workspace_id,
        workspaceSlug: workspace.slug,
        inviteeFullName: userProfile.full_name ?? `User ${userProfile.id}`,
      },
    );

    revalidatePath("/", "layout");
    return getWorkspaceSubPath(workspace, "/");
  });

const declineInvitationSchema = z.object({
  invitationId: z.string(),
});

export const declineInvitationAction = authActionClient
  .schema(declineInvitationSchema)
  .action(async ({ parsedInput: { invitationId }, ctx: { userId } }) => {
    await declineWorkspaceInvitation({
      invitationId,
      userId,
    });

    revalidatePath("/user/invitations");
    revalidatePath("/home");
    revalidatePath("/workspace/[workspaceSlug]", "layout");
    redirect("/dashboard");
  });

export async function getPendingInvitationsOfUser(): Promise<
  WorkspaceInvitation[]
> {
  const supabaseClient = await createSupabaseUserServerComponentClient();
  const user = await serverGetLoggedInUserVerified();
  const { data, error } = await supabaseClient
    .from("workspace_invitations")
    .select(
      "*, inviter:user_profiles!inviter_user_id(*), invitee:user_profiles!invitee_user_id(*)",
    )
    .eq("invitee_user_id", user.id)
    .eq("status", "active");

  if (error) {
    throw error;
  }

  const invitationListPromise = data.map(async (invitation) => {
    const workspace = await getInvitationWorkspaceDetails(
      invitation.workspace_id,
    );
    const inviter = Array.isArray(invitation.inviter)
      ? invitation.inviter[0]
      : invitation.inviter;

    const invitee = Array.isArray(invitation.invitee)
      ? invitation.invitee[0]
      : invitation.invitee;

    if (!workspace || !inviter || !invitee) {
      throw new Error("Organization or Inviter or Invitee not found");
    }
    return {
      ...invitation,
      workspace,
      inviter,
      invitee,
    };
  });

  return Promise.all(invitationListPromise);
}

export const getInvitationById = async (invitationId: string) => {
  const supabaseClient = await createSupabaseUserServerComponentClient();

  const { data, error } = await supabaseClient
    .from("workspace_invitations")
    .select(
      "*, inviter:user_profiles!inviter_user_id(*), invitee:user_profiles!invitee_user_id(*), workspace:workspaces(*)",
    )
    .eq("id", invitationId)
    .eq("status", "active")
    .single();

  if (error) {
    throw error;
  }

  const workspaceId = data.workspace_id;

  const workspace = await getInvitationWorkspaceDetails(workspaceId);

  return {
    ...data,
    workspace,
  };
};

export async function getPendingInvitationCountOfUser() {
  const supabaseClient = await createSupabaseUserServerComponentClient();
  const user = await serverGetLoggedInUserVerified();

  async function idInvitations(userId: string) {
    const { count, error } = await supabaseClient
      .from("workspace_invitations")
      .select("id", { count: "exact", head: true })
      .eq("invitee_user_id", userId)
      .eq("status", "active");

    if (error) {
      throw error;
    }

    return count || 0;
  }

  const idInvitationsCount = await idInvitations(user.id);

  return idInvitationsCount;
}

const revokeInvitationSchema = z.object({
  invitationId: z.string().uuid(),
});

export const revokeInvitationAction = authActionClient
  .schema(revokeInvitationSchema)
  .action(async ({ parsedInput: { invitationId } }) => {
    const supabaseClient = await createSupabaseUserServerActionClient();

    const { data, error } = await supabaseClient
      .from("workspace_invitations")
      .delete()
      .eq("id", invitationId)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/user/invitations");
    return data;
  });

const bulkSettleInvitationsSchema = z.object({
  invitationActions: z.array(
    z.object({
      invitationId: z.string().uuid(),
      action: z.enum(["accepted", "not_accepted"]),
    }),
  ),
});

export const bulkSettleInvitationsAction = authActionClient
  .schema(bulkSettleInvitationsSchema)
  .action(async ({ parsedInput: { invitationActions }, ctx: { userId } }) => {
    const results = await Promise.all(
      invitationActions.map(async ({ invitationId, action }) => {
        try {
          if (action === "accepted") {
            await acceptWorkspaceInvitation({ invitationId, userId });
          } else {
            // we don't decline invitations in bulk since this is the onboarding flow
          }
          return { invitationId, success: true };
        } catch (error) {
          return { invitationId, success: false, error };
        }
      }),
    );

    revalidatePath("/user/invitations");
    revalidatePath("/home");
    revalidatePath("/workspace/[workspaceSlug]", "layout");

    return results;
  });
