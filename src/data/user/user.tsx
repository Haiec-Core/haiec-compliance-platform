"use server";
import { PRODUCT_NAME } from "@/constants";
import { authActionClient } from "@/lib/safe-action";
import { createSupabaseUserServerActionClient } from "@/supabase-clients/user/createSupabaseUserServerActionClient";
import { createSupabaseUserServerComponentClient } from "@/supabase-clients/user/createSupabaseUserServerComponentClient";
import type { SupabaseFileUploadOptions } from "@/types";
import { sendEmail } from "@/utils/api-routes/utils";
import { toSiteURL } from "@/utils/helpers";
import { isSupabaseUserAppAdmin } from "@/utils/isSupabaseUserAppAdmin";
import {
  serverGetLoggedInUserVerified
} from "@/utils/server/serverGetLoggedInUser";
import type { AuthUserMetadata } from "@/utils/zod-schemas/authUserMetadata";
import { renderAsync } from "@react-email/render";
import ConfirmAccountDeletionEmail from "emails/account-deletion-request";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
import urlJoin from "url-join";
import { z } from "zod";
import { refreshSessionAction } from "./session";

export async function getIsAppAdmin(): Promise<boolean> {
  const user = await serverGetLoggedInUserVerified();
  return isSupabaseUserAppAdmin(user);
}

export const getUserProfile = async (userId: string) => {
  const supabase = await createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getUserFullName = async (userId: string) => {
  const supabase = await createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from("user_profiles")
    .select("full_name")
    .eq("id", userId)
    .single();

  if (error) {
    throw error;
  }

  return data.full_name;
};

export const getUserAvatarUrl = async (userId: string) => {
  const supabase = await createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from("user_profiles")
    .select("avatar_url")
    .eq("id", userId)
    .single();

  if (error) {
    throw error;
  }

  return data.avatar_url;
};

export const getUserPendingInvitationsByEmail = async (userEmail: string) => {
  const supabaseClient = await createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from("workspace_invitations")
    .select(
      "*, inviter:user_profiles!inviter_user_id(*), invitee:user_profiles!invitee_user_id(*), workspace:workspaces(*)",
    )
    .ilike("invitee_user_email", `%${userEmail}%`)
    .eq("status", "active");

  if (error) {
    throw error;
  }

  return data || [];
};

export const getUserPendingInvitationsById = async (userId: string) => {
  const supabaseClient = await createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from("workspace_invitations")
    .select(
      "*, inviter:user_profiles!inviter_user_id(*), invitee:user_profiles!invitee_user_id(*), workspace:workspaces(*)",
    )
    .eq("invitee_user_id", userId)
    .eq("status", "active");

  if (error) {
    throw error;
  }

  return data || [];
};

export const uploadPublicUserAvatar = async (
  formData: FormData,
  fileName: string,
  fileOptions?: SupabaseFileUploadOptions | undefined,
): Promise<string> => {
  const file = formData.get("file");
  if (!file) {
    throw new Error("File is empty");
  }
  const slugifiedFilename = slugify(fileName, {
    lower: true,
    strict: true,
    replacement: "-",
  });
  const supabaseClient = await createSupabaseUserServerActionClient();
  const user = await serverGetLoggedInUserVerified();
  const userId = user.id;
  const userImagesPath = `${userId}/images/${slugifiedFilename}`;

  const { data, error } = await supabaseClient.storage
    .from("public-user-assets")
    .upload(userImagesPath, file, fileOptions);

  if (error) {
    throw new Error(error.message);
  }

  const { path } = data;

  const filePath = path.split(",")[0];
  const supabaseFileUrl = urlJoin(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    "/storage/v1/object/public/public-user-assets",
    filePath,
  );

  return supabaseFileUrl;
};

const uploadPublicUserAvatarSchema = z.object({
  formData: z.instanceof(FormData),
  fileName: z.string(),
  fileOptions: z
    .object({
      cacheControl: z.string().optional(),
      upsert: z.boolean().optional(),
      contentType: z.string().optional(),
    })
    .optional()
    .default({}),
});

export const uploadPublicUserAvatarAction = authActionClient
  .schema(uploadPublicUserAvatarSchema)
  .action(
    async ({
      parsedInput: { formData, fileName, fileOptions },
    }): Promise<string> => {
      const profilePictureURL = await uploadPublicUserAvatar(
        formData,
        fileName,
        fileOptions,
      );

      const actionResponse = await updateProfilePictureUrlAction({
        profilePictureUrl: profilePictureURL,
      });

      if (actionResponse?.data) {
        return actionResponse.data;
      }

      console.log("actionResponse", actionResponse);
      throw new Error("Updating profile picture url failed");
    },
  );

const updateProfilePictureUrlSchema = z.object({
  profilePictureUrl: z.string(),
});

export const updateProfilePictureUrlAction = authActionClient
  .schema(updateProfilePictureUrlSchema)
  .action(async ({ parsedInput: { profilePictureUrl } }) => {
    const supabaseClient = await createSupabaseUserServerActionClient();
    const user = await serverGetLoggedInUserVerified();
    const { error } = await supabaseClient
      .from("user_profiles")
      .update({
        avatar_url: profilePictureUrl,
      })
      .eq("id", user.id);

    if (error) {
      throw new Error(error.message);
    }

    return profilePictureUrl;
  });

const updateUserProfileNameAndAvatarSchema = z.object({
  fullName: z.string(),
  avatarUrl: z.string().optional(),
  isOnboardingFlow: z.boolean().optional().default(false),
});

export const updateUserProfileNameAndAvatarAction = authActionClient
  .schema(updateUserProfileNameAndAvatarSchema)
  .action(
    async ({ parsedInput: { fullName, avatarUrl, isOnboardingFlow } }) => {
      const supabaseClient = await createSupabaseUserServerActionClient();
      const user = await serverGetLoggedInUserVerified();
      const { data, error } = await supabaseClient
        .from("user_profiles")
        .update({
          full_name: fullName,
          avatar_url: avatarUrl,
        })
        .eq("id", user.id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      if (isOnboardingFlow) {
        const updateUserMetadataPayload: Partial<AuthUserMetadata> = {
          onboardingHasCompletedProfile: true,
        };

        const updateUserMetadataResponse = await supabaseClient.auth.updateUser(
          {
            data: updateUserMetadataPayload,
          },
        );

        if (updateUserMetadataResponse.error) {
          throw new Error(updateUserMetadataResponse.error.message);
        }

        await refreshSessionAction();

        revalidatePath("/", "layout");
      }

      return data;
    },
  );

const updateUserProfilePictureSchema = z.object({
  avatarUrl: z.string(),
});

export const updateUserProfilePictureAction = authActionClient
  .schema(updateUserProfilePictureSchema)
  .action(async ({ parsedInput: { avatarUrl } }) => {
    const supabaseClient = await createSupabaseUserServerActionClient();
    const user = await serverGetLoggedInUserVerified();
    const { data, error } = await supabaseClient
      .from("user_profiles")
      .update({
        avatar_url: avatarUrl,
      })
      .eq("id", user.id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }
    revalidatePath("/", "layout");
    return data;
  });

export async function acceptTermsOfService(): Promise<boolean> {
  const supabaseClient = await createSupabaseUserServerActionClient();

  const updateUserMetadataPayload: Partial<AuthUserMetadata> = {
    onboardingHasAcceptedTerms: true,
  };

  const { error } = await supabaseClient.auth.updateUser({
    data: updateUserMetadataPayload,
  });

  if (error) {
    throw new Error(`Failed to accept terms of service: ${error.message}`);
  }

  await refreshSessionAction();

  return true;
}

export const acceptTermsOfServiceAction = authActionClient.action(
  async (): Promise<boolean> => {
    return await acceptTermsOfService();
  },
);

// Define the action to request account deletion
export const requestAccountDeletionAction = authActionClient.action(
  async () => {
    const supabaseClient = await createSupabaseUserServerActionClient();
    const user = await serverGetLoggedInUserVerified();

    if (!user.email) {
      throw new Error("User email not found");
    }

    const { data, error } = await supabaseClient
      .from("account_delete_tokens")
      .upsert({
        user_id: user.id,
      })
      .select("*")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    const userFullName =
      (await getUserFullName(user.id)) ?? `User ${user.email ?? ""}`;

    const deletionHTML = await renderAsync(
      <ConfirmAccountDeletionEmail
        deletionConfirmationLink={toSiteURL(
          `/confirm-delete-user/${data.token}`,
        )}
        userName={userFullName}
        appName={PRODUCT_NAME}
      />,
    );

    await sendEmail({
      from: process.env.ADMIN_EMAIL,
      html: deletionHTML,
      subject: `Confirm Account Deletion - ${PRODUCT_NAME}`,
      to: user.email,
    });

    return data;
  },
);

const updateUserFullNameSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  isOnboardingFlow: z.boolean().optional().default(false),
});

export const updateUserFullNameAction = authActionClient
  .schema(updateUserFullNameSchema)
  .action(async ({ parsedInput: { fullName, isOnboardingFlow } }) => {
    const supabaseClient = await createSupabaseUserServerActionClient();
    const user = await serverGetLoggedInUserVerified();

    const { data, error } = await supabaseClient
      .from("user_profiles")
      .update({ full_name: fullName })
      .eq("id", user.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update full name: ${error.message}`);
    }

    if (isOnboardingFlow) {
      const updateUserMetadataPayload: Partial<AuthUserMetadata> = {
        onboardingHasCompletedProfile: true,
      };

      const updateUserMetadataResponse = await supabaseClient.auth.updateUser({
        data: updateUserMetadataPayload,
      });

      if (updateUserMetadataResponse.error) {
        throw new Error(updateUserMetadataResponse.error.message);
      }

      await refreshSessionAction();
    }

    revalidatePath("/", "layout");
    return data;
  });
