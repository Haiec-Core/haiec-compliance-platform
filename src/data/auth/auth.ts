"use server";
import { actionClient } from "@/lib/safe-action";
import { createSupabaseUserServerActionClient } from "@/supabase-clients/user/createSupabaseUserServerActionClient";
import {
  handleSupabaseAuthMagicLinkErrors,
  handleSupabaseAuthPasswordSignUpErrors,
  handleSupabaseAuthResetPasswordErrors,
  handleSupabaseAuthSignInErrors,
} from "@/utils/errorMessage";
import { toSiteURL } from "@/utils/helpers";
import {
  resetPasswordSchema,
  signInWithMagicLinkSchema,
  signInWithPasswordSchema,
  signInWithProviderSchema,
  signUpWithPasswordSchema,
} from "@/utils/zod-schemas/auth";
import { returnValidationErrors } from "next-safe-action";

/**
 * Signs up a new user with email and password.
 * @param {Object} params - The parameters for sign up.
 * @param {string} params.email - The user's email address.
 * @param {string} params.password - The user's password (minimum 8 characters).
 * @returns {Promise<Object>} The data returned from the sign-up process.
 * @throws {Error} If there's an error during sign up.
 */
export const signUpWithPasswordAction = actionClient
  .schema(signUpWithPasswordSchema)
  .action(async ({ parsedInput: { email, password, next } }) => {
    const supabase = await createSupabaseUserServerActionClient();
    const emailRedirectTo = new URL(toSiteURL("/auth/callback"));
    if (next) {
      emailRedirectTo.searchParams.set("next", next);
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: emailRedirectTo.toString(),
      },
    });

    if (error) {
      const errorDetails = handleSupabaseAuthPasswordSignUpErrors(error);
      if (errorDetails.field) {
        returnValidationErrors(signUpWithPasswordSchema, {
          [email]: {
            _errors: [errorDetails.message],
          },
        });
      } else {
        returnValidationErrors(signUpWithPasswordSchema, {
          _errors: [errorDetails.message],
        });
      }
    }

    return data;
  });

/**
 * Signs in a user with email and password.
 * @param {Object} params - The parameters for sign in.
 * @param {string} params.email - The user's email address.
 * @param {string} params.password - The user's password.
 * @throws {Error} If there's an error during sign in.
 */
export const signInWithPasswordAction = actionClient
  .schema(signInWithPasswordSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const supabase = await createSupabaseUserServerActionClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      const errorDetails = handleSupabaseAuthSignInErrors(error);
      if (errorDetails.field === "email") {
        returnValidationErrors(signInWithPasswordSchema, {
          email: {
            _errors: [errorDetails.message],
          },
        });
      } else if (errorDetails.field === "password") {
        returnValidationErrors(signInWithPasswordSchema, {
          password: {
            _errors: [errorDetails.message],
          },
        });
      } else {
        returnValidationErrors(signInWithPasswordSchema, {
          _errors: [errorDetails.message],
        });
      }
    }

    return data;
  });

/**
 * Sends a magic link to the user's email for passwordless sign in.
 * @param {Object} params - The parameters for magic link sign in.
 * @param {string} params.email - The user's email address.
 * @param {string} [params.next] - The URL to redirect to after successful sign in.
 * @throws {Error} If there's an error sending the magic link.
 */
export const signInWithMagicLinkAction = actionClient
  .schema(signInWithMagicLinkSchema)
  .action(async ({ parsedInput: { email, next, shouldCreateUser } }) => {
    const supabase = await createSupabaseUserServerActionClient();
    const redirectUrl = new URL(toSiteURL("/auth/callback"));
    if (next) {
      redirectUrl.searchParams.set("next", next);
    }
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser,
        emailRedirectTo: redirectUrl.toString(),
      },
    });

    if (error) {
      const errorDetails = handleSupabaseAuthMagicLinkErrors(error);
      returnValidationErrors(signInWithMagicLinkSchema, {
        email: {
          _errors: [errorDetails.message],
        },
      });
    }

    // No need to return anything if the operation is successful
  });

/**
 * Initiates OAuth sign in with a specified provider.
 * @param {Object} params - The parameters for OAuth sign in.
 * @param {('google'|'github'|'gitlab'|'bitbucket')} params.provider - The OAuth provider.
 * @param {string} [params.next] - The URL to redirect to after successful sign in.
 * @returns {Promise<{url: string}>} The URL to redirect the user to for OAuth sign in.
 * @throws {Error} If there's an error initiating OAuth sign in.
 */
export const signInWithProviderAction = actionClient
  .schema(signInWithProviderSchema)
  .action(async ({ parsedInput: { provider, next } }) => {
    const supabase = await createSupabaseUserServerActionClient();
    const redirectToURL = new URL(toSiteURL("/auth/callback"));
    if (next) {
      redirectToURL.searchParams.set("next", next);
    }
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectToURL.toString(),
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return { url: data.url };
  });

/**
 * Initiates the password reset process for a user.
 * @param {Object} params - The parameters for password reset.
 * @param {string} params.email - The email address of the user requesting password reset.
 * @throws {Error} If there's an error initiating the password reset.
 */
export const resetPasswordAction = actionClient
  .schema(resetPasswordSchema)
  .action(async ({ parsedInput: { email } }) => {
    const supabase = await createSupabaseUserServerActionClient();
    const redirectToURL = new URL(toSiteURL("/auth/callback"));
    redirectToURL.searchParams.set("next", "/update-password");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectToURL.toString(),
    });

    if (error) {
      const errorDetails = handleSupabaseAuthResetPasswordErrors(error);
      if (errorDetails.field === "email") {
        returnValidationErrors(resetPasswordSchema, {
          email: { _errors: [errorDetails.message] },
        });
      } else {
        returnValidationErrors(resetPasswordSchema, {
          _errors: [errorDetails.message],
        });
      }
    }

    // No need to return anything if the operation is successful
  });
