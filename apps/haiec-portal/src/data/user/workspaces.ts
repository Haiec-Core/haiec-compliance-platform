"use server";

import { authActionClient } from "@/lib/safe-action";
import { createSupabaseUserServerActionClient } from "@/supabase-clients/user/createSupabaseUserServerActionClient";
import { createSupabaseUserServerComponentClient } from "@/supabase-clients/user/createSupabaseUserServerComponentClient";
import type {
  DBTableInsertPayload,
  Enum,
  SlimWorkspaces,
  WorkspaceWithMembershipType,
} from "@/types";
import { serverGetLoggedInUserVerified } from "@/utils/server/serverGetLoggedInUser";
import { getWorkspaceSubPath } from "@/utils/workspaces";
import { AuthUserMetadata } from "@/utils/zod-schemas/authUserMetadata";
import { projectStatusEnum } from "@/utils/zod-schemas/enums/projectStatusEnum";
import {
  createWorkspaceSchema,
  workspaceMemberRoleEnum,
} from "@/utils/zod-schemas/workspaces";
import { faker } from "@faker-js/faker";
import { revalidatePath } from "next/cache";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import {
  addUserAsWorkspaceOwner,
  updateUserAppMetadata,
  updateWorkspaceMembershipType,
} from "./elevatedQueries";
import { refreshSessionAction } from "./session";

export const getWorkspaceIdBySlug = async (slug: string) => {
  const supabaseClient = await createSupabaseUserServerComponentClient();

  const { data, error } = await supabaseClient
    .from("workspaces")
    .select("id")
    .eq("slug", slug)
    .single();

  if (error) {
    throw error;
  }

  return data.id;
};

export const getWorkspaceBySlug = async (
  slug: string,
): Promise<WorkspaceWithMembershipType> => {
  const supabaseClient = await createSupabaseUserServerComponentClient();

  const { data, error } = await supabaseClient
    .from("workspaces")
    .select("*, workspace_application_settings(membership_type)")
    .eq("slug", slug)
    .single();

  if (error) {
    throw error;
  }

  const { workspace_application_settings, ...workspace } = data;
  return {
    ...workspace,
    membershipType: workspace_application_settings?.membership_type ?? "solo",
  };
};

export const getWorkspaceSlugById = async (workspaceId: string) => {
  const supabaseClient = await createSupabaseUserServerComponentClient();

  const { data, error } = await supabaseClient
    .from("workspaces")
    .select("slug")
    .eq("id", workspaceId)
    .single();

  if (error) {
    throw error;
  }

  return data.slug;
};

export async function getWorkspaceName(workspaceId: string): Promise<string> {
  const supabaseClient = await createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from("workspaces")
    .select("name")
    .eq("id", workspaceId)
    .single();

  if (error) throw error;
  return data.name;
}

export async function getWorkspaces(userId: string) {
  const supabaseClient = await createSupabaseUserServerComponentClient();

  const { data, error } = await supabaseClient
    .from("workspace_members")
    .select("workspace_id, workspaces(id, slug, title, is_solo)")
    .eq("user_id", userId);

  if (error) throw error;
  return data.map(({ workspaces }) => workspaces);
}

export const getSlimWorkspaceById = async (workspaceId: string) => {
  const supabaseClient = await createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from("workspaces")
    .select("id,name,slug")
    .eq("id", workspaceId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getSlimWorkspaceBySlug = async (workspaceSlug: string) => {
  const supabaseClient = await createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from("workspaces")
    .select("id,name,slug")
    .eq("slug", workspaceSlug)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getLoggedInUserWorkspaceRole = async (
  workspaceId: string,
): Promise<Enum<"workspace_member_role_type">> => {
  const { id: userId } = await serverGetLoggedInUserVerified();
  const supabaseClient = await createSupabaseUserServerComponentClient();

  const { data, error } = await supabaseClient
    .from("workspace_members")
    .select("workspace_member_role")
    .eq("workspace_member_id", userId)
    .eq("workspace_id", workspaceId)
    .single();

  if (error) {
    throw error;
  } else if (!data) {
    throw new Error("User is not a member of this organization");
  }

  return data.workspace_member_role;
};

export const createWorkspaceAction = authActionClient
  .schema(createWorkspaceSchema)
  .action(
    async ({
      parsedInput: { name, slug, workspaceType, isOnboardingFlow },
      ctx: { userId },
    }) => {
      const workspaceId = uuid();
      const supabaseClient = await createSupabaseUserServerActionClient();
      const { error } = await supabaseClient.from("workspaces").insert({
        id: workspaceId,
        name,
        slug: slug ?? workspaceId,
      });

      if (error) {
        throw new Error(error.message);
      }

      await Promise.all([
        addUserAsWorkspaceOwner({ workspaceId, userId }),
        updateWorkspaceMembershipType({
          workspaceId,
          workspaceMembershipType: workspaceType,
        }),
      ]);

      if (isOnboardingFlow) {
        // Create dummy projects

        const randomProjects: DBTableInsertPayload<"projects">[] = Array.from({
          length: 25,
        }).map((_) => {
          const projectPayload: DBTableInsertPayload<"projects"> = {
            workspace_id: workspaceId,
            name: faker.internet.domainWord(),
            project_status: faker.helpers.arrayElement(
              projectStatusEnum.options,
            ),
          };
          return projectPayload;
        });

        const { error: projectError } = await supabaseClient
          .from("projects")
          .insert(randomProjects);

        if (projectError) {
          console.error("Error creating projects", projectError);
          throw new Error(projectError.message);
        }

        // Set default workspace for the user
        const { error: updateError } = await supabaseClient
          .from("user_settings")
          .update({
            default_workspace: workspaceId,
          })
          .eq("id", userId);

        if (updateError) {
          console.error("Error setting default workspace", updateError);
          throw new Error(updateError.message);
        }

        // Update user metadata
        const updateUserMetadataPayload: Partial<AuthUserMetadata> = {
          onboardingHasCreatedWorkspace: true,
        };

        await updateUserAppMetadata({
          userId,
          appMetadata: updateUserMetadataPayload,
        });

        // Refresh the session
        await refreshSessionAction();
      }

      if (workspaceType === "team") {
        revalidatePath(`/workspace/${slug}`, "layout");
      } else {
        revalidatePath(`/`, "layout");
      }

      return slug;
    },
  );

export const getWorkspaceById = async (
  workspaceId: string,
): Promise<WorkspaceWithMembershipType> => {
  const supabaseClient = await createSupabaseUserServerComponentClient();

  const { data, error } = await supabaseClient
    .from("workspaces")
    .select("*, workspace_application_settings(membership_type)")
    .eq("id", workspaceId)
    .single();

  if (error) {
    throw error;
  }

  const { workspace_application_settings, ...workspace } = data;
  return {
    ...workspace,
    membershipType: workspace_application_settings?.membership_type ?? "solo",
  };
};

export const getAllWorkspacesForUser = async (
  userId: string,
): Promise<WorkspaceWithMembershipType[]> => {
  const supabaseClient = await createSupabaseUserServerComponentClient();

  const { data: workspaceMembers, error: membersError } = await supabaseClient
    .from("workspace_members")
    .select("workspace_id")
    .eq("workspace_member_id", userId);

  if (membersError) {
    console.error("fetchSlimWorkspaces workspaceMembers", membersError);
    throw membersError;
  }

  const { data, error } = await supabaseClient
    .from("workspaces")
    .select("*,workspace_application_settings(membership_type)")
    .in(
      "id",
      workspaceMembers.map((member) => member.workspace_id),
    )
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("fetchSlimWorkspaces workspaceMembers", error);
    throw error;
  }

  const workspaces = data.map(
    ({ workspace_application_settings, ...workspace }) => ({
      ...workspace,
      membershipType: workspace_application_settings?.membership_type ?? "solo",
    }),
  );
  return workspaces;
};

export const getWorkspaceTeamMembers = async (workspaceId: string) => {
  const supabaseClient = await createSupabaseUserServerComponentClient();

  const { data, error } = await supabaseClient
    .from("workspace_members")
    .select("*, user_profiles(*)")
    .eq("workspace_id", workspaceId);

  if (error) {
    throw error;
  }

  return data;
};

export const getWorkspaceInvitations = async (workspaceId: string) => {
  const supabaseClient = await createSupabaseUserServerComponentClient();

  const { data, error } = await supabaseClient
    .from("workspace_invitations")
    .select("*")
    .eq("workspace_id", workspaceId)
    .eq("status", "active");

  if (error) {
    throw error;
  }

  return data;
};

const deleteWorkspaceParamsSchema = z.object({
  workspaceId: z.string(),
});

export const deleteWorkspaceAction = authActionClient
  .schema(deleteWorkspaceParamsSchema)
  .action(async ({ parsedInput: { workspaceId } }) => {
    const supabaseClient = await createSupabaseUserServerActionClient();

    const { error } = await supabaseClient
      .from("workspaces")
      .delete()
      .eq("id", workspaceId);

    if (error) {
      return { status: "error", message: error.message };
    }

    revalidatePath("/workspaces", "layout");

    return {
      status: "success",
      data: `Workspace ${workspaceId} deleted successfully`,
    };
  });

export const getWorkspaceCredits = async (
  workspaceId: string,
): Promise<number> => {
  const supabaseClient = await createSupabaseUserServerComponentClient();

  const { data, error } = await supabaseClient
    .from("workspace_credits")
    .select("credits")
    .eq("workspace_id", workspaceId)
    .single();

  if (error) {
    throw error;
  }

  return data.credits;
};

const updateWorkspaceCreditsSchema = z.object({
  workspaceId: z.string().uuid(),
  newCredits: z.number().int().positive(),
});

export const updateWorkspaceCreditsAction = authActionClient
  .schema(updateWorkspaceCreditsSchema)
  .action(async ({ parsedInput: { workspaceId, newCredits } }) => {
    const supabaseClient = await createSupabaseUserServerActionClient();

    const { data, error } = await supabaseClient
      .from("workspace_credits")
      .update({ credits: newCredits })
      .eq("workspace_id", workspaceId)
      .select("credits")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data.credits;
  });

export const getWorkspaceCreditsLogs = async (workspaceId: string) => {
  const supabaseClient = await createSupabaseUserServerComponentClient();

  const { data, error } = await supabaseClient
    .from("workspace_credits_logs")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("changed_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

export async function getMaybeDefaultWorkspace(): Promise<WorkspaceWithMembershipType | null> {
  const supabaseClient = await createSupabaseUserServerComponentClient();
  const user = await serverGetLoggedInUserVerified();

  // Check for solo workspace
  const [workspaceListResponse, userSettingsResponse] = await Promise.all([
    supabaseClient
      .from("workspaces")
      .select("*, workspace_application_settings(*)"),
    supabaseClient.from("user_settings").select("*").eq("id", user.id).single(),
  ]);

  const { data: workspaceList, error: workspaceListError } =
    workspaceListResponse;

  if (workspaceListError) {
    throw workspaceListError;
  }

  if (Array.isArray(workspaceList) && workspaceList.length > 0) {
    // if there is a solo workspace or a default workspace
    // Check for default workspace in user settings

    const { data: userSettings, error: settingsError } = userSettingsResponse;

    if (settingsError && settingsError.code !== "PGRST116") {
      throw settingsError;
    }
    const defaultWorkspace = workspaceList.find(
      (workspace) => workspace.id === userSettings?.default_workspace,
    );
    // if a default workspace is set, return it
    if (defaultWorkspace) {
      return {
        ...defaultWorkspace,
        membershipType:
          defaultWorkspace.workspace_application_settings?.membership_type ??
          "solo",
      };
    } else {
      const w = workspaceList[0];
      return {
        ...w,
        membershipType:
          w.workspace_application_settings?.membership_type ?? "solo",
      };
    }
  } else {
    return null;
  }
}

export async function getSoloWorkspace(): Promise<WorkspaceWithMembershipType> {
  const user = await serverGetLoggedInUserVerified();

  const allWorkspaces = await getAllWorkspacesForUser(user.id);
  const soloWorkspace = allWorkspaces.find(
    (workspace) => workspace.membershipType === "solo",
  );
  if (!soloWorkspace) {
    throw new Error("No solo workspace found");
  }
  return soloWorkspace;
}

export async function fetchSlimWorkspaces(): Promise<SlimWorkspaces> {
  const currentUser = await serverGetLoggedInUserVerified();
  const supabaseClient = await createSupabaseUserServerComponentClient();

  const { data: workspaceMembers, error: membersError } = await supabaseClient
    .from("workspace_members")
    .select("workspace_id")
    .eq("workspace_member_id", currentUser.id);

  if (membersError) {
    console.error("fetchSlimWorkspaces workspaceMembers", membersError);
    throw membersError;
  }

  const { data, error } = await supabaseClient
    .from("workspaces")
    .select("id,name,slug,workspace_application_settings(membership_type)")
    .in(
      "id",
      workspaceMembers.map((member) => member.workspace_id),
    )
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("fetchSlimWorkspaces workspaceMembers", error);
    throw error;
  }

  const workspaces = data.map((workspace) => ({
    id: workspace.id,
    name: workspace.name,
    slug: workspace.slug,
    membershipType:
      workspace.workspace_application_settings?.membership_type ?? "solo",
  }));
  return workspaces;
}

const setDefaultWorkspaceSchema = z.object({
  workspaceId: z.string().uuid(),
});

export const setDefaultWorkspaceAction = authActionClient
  .schema(setDefaultWorkspaceSchema)
  .action(async ({ parsedInput: { workspaceId }, ctx: { userId } }) => {
    const supabaseClient = await createSupabaseUserServerActionClient();

    const { error } = await supabaseClient.from("user_settings").upsert(
      {
        id: userId,
        default_workspace: workspaceId,
      },
      {
        onConflict: "id",
      },
    );

    if (error) {
      throw new Error(error.message);
    }

    return workspaceId;
  });

const updateWorkspaceInfoSchema = z.object({
  workspaceId: z.string(),
  name: z.string(),
  slug: z.string(),
  workspaceMembershipType: z.enum(["solo", "team"]),
});

export const updateWorkspaceInfoAction = authActionClient
  .schema(updateWorkspaceInfoSchema)
  .action(
    async ({
      parsedInput: { workspaceId, name, slug, workspaceMembershipType },
    }) => {
      const supabase = await createSupabaseUserServerActionClient();
      const { data, error } = await supabase
        .from("workspaces")
        .update({
          name,
          slug,
        })
        .eq("id", workspaceId)
        .select("*, workspace_application_settings(membership_type)")
        .single();

      if (error) {
        throw new Error(error.message);
      }
      const revalidateLayoutPath = getWorkspaceSubPath(
        workspaceMembershipType,
        "/",
      );
      revalidatePath(revalidateLayoutPath, "layout");

      return {
        ...data,
        membershipType:
          data.workspace_application_settings?.membership_type ?? "solo",
      };
    },
  );

export const getPendingInvitationsInWorkspace = async (workspaceId: string) => {
  const supabaseClient = await createSupabaseUserServerComponentClient();

  const { data, error } = await supabaseClient
    .from("workspace_invitations")
    .select(
      "*, inviter:user_profiles!inviter_user_id(*), invitee:user_profiles!invitee_user_id(*)",
    )
    .eq("workspace_id", workspaceId)
    .eq("status", "active");

  if (error) {
    throw error;
  }

  return data || [];
};

const updateWorkspaceMemberRoleSchema = z.object({
  workspaceId: z.string().uuid(),
  memberId: z.string().uuid(),
  role: workspaceMemberRoleEnum,
});

export const updateWorkspaceMemberRoleAction = authActionClient
  .schema(updateWorkspaceMemberRoleSchema)
  .action(async ({ parsedInput: { workspaceId, memberId, role } }) => {
    const supabaseClient = await createSupabaseUserServerActionClient();

    const { error } = await supabaseClient
      .from("workspace_members")
      .update({ workspace_member_role: role })
      .eq("workspace_id", workspaceId)
      .eq("workspace_member_id", memberId);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath(`/workspace/${workspaceId}/settings/members`, "page");
  });

const removeWorkspaceMemberSchema = z.object({
  workspaceId: z.string().uuid(),
  memberId: z.string().uuid(),
});

export const removeWorkspaceMemberAction = authActionClient
  .schema(removeWorkspaceMemberSchema)
  .action(async ({ parsedInput: { workspaceId, memberId } }) => {
    const supabaseClient = await createSupabaseUserServerActionClient();

    const { error } = await supabaseClient
      .from("workspace_members")
      .delete()
      .eq("workspace_id", workspaceId)
      .eq("workspace_member_id", memberId);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath(`/workspace/${workspaceId}/settings/members`, "page");
  });

const leaveWorkspaceSchema = z.object({
  workspaceId: z.string().uuid(),
  memberId: z.string().uuid(),
});

export const leaveWorkspaceAction = authActionClient
  .schema(leaveWorkspaceSchema)
  .action(async ({ parsedInput: { workspaceId, memberId } }) => {
    const supabaseClient = await createSupabaseUserServerActionClient();

    const { error } = await supabaseClient
      .from("workspace_members")
      .delete()
      .eq("workspace_id", workspaceId)
      .eq("workspace_member_id", memberId);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/", "layout");
  });
