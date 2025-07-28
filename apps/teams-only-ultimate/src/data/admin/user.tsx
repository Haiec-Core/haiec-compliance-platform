"use server";
import { adminActionClient } from "@/lib/safe-action";
import { supabaseAdminClient } from "@/supabase-clients/admin/supabaseAdminClient";
import { sendEmail } from "@/utils/api-routes/utils";
import {
  serverGetLoggedInUserVerified
} from "@/utils/server/serverGetLoggedInUser";
import { renderAsync } from "@react-email/render";
import SignInEmail from "emails/SignInEmail";
import slugify from "slugify";
import urlJoin from "url-join";
import { z } from "zod";
import { zfd } from "zod-form-data";

const appAdminGetUserProfileSchema = z.object({
  userId: z.string(),
});

export const appAdminGetUserProfileAction = adminActionClient
  .schema(appAdminGetUserProfileSchema)
  .action(async ({ parsedInput: { userId } }) => {
    const { data, error } = await supabaseAdminClient
      .from("user_profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return data;
  });

const uploadImageSchema = z.object({
  formData: zfd.formData({
    file: zfd.file(),
  }),
  fileName: z.string(),
  fileOptions: z.object({}).optional(),
});

export const uploadImageAction = adminActionClient
  .schema(uploadImageSchema)
  .action(async ({ parsedInput: { formData, fileName, fileOptions } }) => {
    const file = formData.file;
    if (!file) {
      return { status: "error", message: "File is empty" };
    }
    const slugifiedFilename = slugify(fileName, {
      lower: true,
      strict: true,
      replacement: "-",
    });

    const user = await serverGetLoggedInUserVerified();
    const userId = user.id;
    const userImagesPath = `${userId}/images/${slugifiedFilename}`;

    const { data, error } = await supabaseAdminClient.storage
      .from("changelog-assets")
      .upload(userImagesPath, file, fileOptions);

    if (error) {
      return {
        status: "error",
        message: error.message,
      };
    }

    const { path } = data;

    const filePath = path.split(",")[0];
    const supabaseFileUrl = urlJoin(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      "/storage/v1/object/public/changelog-assets",
      filePath,
    );

    return {
      status: "success",
      data: supabaseFileUrl,
    };
  });

const appAdminGetUserImpersonationUrlSchema = z.object({
  userId: z.string(),
});

export const appAdminGetUserImpersonationUrlAction = adminActionClient
  .schema(appAdminGetUserImpersonationUrlSchema)
  .action(async ({ parsedInput: { userId } }) => {
    const response = await supabaseAdminClient.auth.admin.getUserById(userId);

    const { data: user, error: userError } = response;

    if (userError) {
      throw userError;
    }

    if (!user?.user) {
      throw new Error("User does not exist");
    }

    if (!user.user.email) {
      throw new Error("User does not have an email");
    }

    const generateLinkResponse =
      await supabaseAdminClient.auth.admin.generateLink({
        email: user.user.email,
        type: "magiclink",
      });

    const { data: generateLinkData, error: generateLinkError } =
      generateLinkResponse;

    if (generateLinkError) {
      throw generateLinkError;
    }

    if (process.env.NEXT_PUBLIC_SITE_URL !== undefined) {
      // change the origin of the link to the site url
      const {
        properties: { hashed_token },
      } = generateLinkData;

      const tokenHash = hashed_token;
      const searchParams = new URLSearchParams({
        token_hash: tokenHash,
        next: "/dashboard",
      });

      const checkAuthUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL);
      checkAuthUrl.pathname = `/auth/confirm`;
      checkAuthUrl.search = searchParams.toString();

      return checkAuthUrl.toString();
    }

    throw new Error("Failed to generate login link");
  });

const createUserSchema = z.object({
  email: z.string().email(),
});

export const createUserAction = adminActionClient
  .schema(createUserSchema)
  .action(async ({ parsedInput: { email } }) => {
    const response = await supabaseAdminClient.auth.admin.createUser({
      email,
    });

    if (response.error) {
      return {
        status: "error",
        message: response.error.message,
      };
    }

    const { user } = response.data;

    if (user) {
      // revalidatePath('/app_admin');
      return {
        status: "success",
        data: user,
      };
    }

    throw new Error("User not created");
  });

const sendLoginLinkSchema = z.object({
  email: z.string().email(),
});

export const sendLoginLinkAction = adminActionClient
  .schema(sendLoginLinkSchema)
  .action(async ({ parsedInput: { email } }) => {
    const response = await supabaseAdminClient.auth.admin.generateLink({
      email,
      type: "magiclink",
    });

    if (response.error) {
      return {
        status: "error",
        message: response.error.message,
      };
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

        const { data: userProfile, error: userProfileError } =
          await supabaseAdminClient
            .from("user_profiles")
            .select("id,full_name, user_application_settings(*)")
            .eq("user_application_settings.email_readonly", email)
            .single();

        if (userProfileError) {
          throw userProfileError;
        }

        const userEmail = userProfile.user_application_settings?.email_readonly;
        const userName = userProfile.full_name;

        if (!userEmail) {
          throw new Error("User email not found");
        }

        // send email
        const signInEmailHTML = await renderAsync(
          <SignInEmail
            signInUrl={url.toString()}
            companyName="Nextbase"
            userName={userName ?? "User"}
            logoUrl={urlJoin(
              process.env.NEXT_PUBLIC_SUPABASE_URL,
              "/storage/v1/object/public/marketing-assets",
              "nextbase-logo.png",
            )}
          />,
        );

        if (process.env.NODE_ENV === "development") {
          // In development, we log the email to the console instead of sending it.
          console.log({
            link: url.toString(),
          });
        } else {
          await sendEmail({
            to: email,
            subject: `Here is your login link `,
            html: signInEmailHTML,
            //TODO: Modify this to your app's admin email
            // Make sure you have verified this email in your Sendgrid (mail provider) account
            from: process.env.ADMIN_EMAIL,
          });
        }
      }
      return {
        status: "success",
      };
    }
    return {
      status: "success",
    };
  });

const getPaginatedUserListSchema = z.object({
  query: z.string().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
});

export const getPaginatedUserListAction = adminActionClient
  .schema(getPaginatedUserListSchema)
  .action(async ({ parsedInput: { query = "", page = 1, limit = 10 } }) => {
    console.log("query", query);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    let supabaseQuery = supabaseAdminClient
      .from("user_profiles")
      .select("*, user_application_settings(*), user_roles(*)");
    console.log(query);
    if (query) {
      supabaseQuery = supabaseQuery.ilike("full_name", `%${query}%`);
    }
    console.log(startIndex, endIndex);
    const { data, error } = await supabaseQuery
      .limit(limit)
      .range(startIndex, endIndex);

    if (error) {
      throw error;
    }
    console.log(data);
    return data;
  });

const getUsersTotalPagesSchema = z.object({
  query: z.string().optional(),
  limit: z.number().optional(),
});

export const getUsersTotalPagesAction = adminActionClient
  .schema(getUsersTotalPagesSchema)
  .action(async ({ parsedInput: { query = "", limit = 10 } }) => {
    console.log("query", query);
    let supabaseQuery = supabaseAdminClient
      .from("user_profiles")
      .select("*, user_application_settings(*), user_roles(*)", {
        count: "exact",
        head: true,
      });
    if (query) {
      supabaseQuery = supabaseQuery.ilike("full_name", `%${query}%`);
    }
    const { count, error } = await supabaseQuery;

    if (error) {
      console.log("supabase***************");
      console.error(error);
      throw error;
    }

    return Math.ceil((count ?? 0) / limit);
  });

const uploadBlogImageSchema = z.object({
  formData: zfd.formData({
    file: zfd.file(),
  }),
  fileName: z.string(),
  fileOptions: z.object({}).optional(),
});

export const uploadBlogImageAction = adminActionClient
  .schema(uploadBlogImageSchema)
  .action(async ({ parsedInput: { formData, fileName, fileOptions } }) => {
    const file = formData.file;
    if (!file) {
      return { status: "error", message: "File is empty" };
    }
    const slugifiedFilename = slugify(fileName, {
      lower: true,
      strict: true,
      replacement: "-",
    });

    const userImagesPath = `blog/images/${slugifiedFilename}`;

    const { data, error } = await supabaseAdminClient.storage
      .from("marketing-assets")
      .upload(userImagesPath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      return { status: "error", message: error.message };
    }

    const { path } = data;

    const filePath = path.split(",")[0];
    const supabaseFileUrl = urlJoin(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      "/storage/v1/object/public/marketing-assets",
      filePath,
    );

    return { status: "success", data: supabaseFileUrl };
  });
