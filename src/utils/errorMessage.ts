import { AuthError } from "@supabase/supabase-js";
import { flattenValidationErrors, ValidationErrors } from "next-safe-action";
import { z, ZodSchema } from "zod";

type AuthFormErrorReturnType = {
  field?: "email" | "password" | "username";
  message: string;
};

export function handleSupabaseAuthEmailPasswordFormErrors(
  error: AuthError,
): AuthFormErrorReturnType {
  switch (error.code) {
    case "invalid_credentials":
      return { message: "Invalid email or password. Please try again." };
    case "user_not_found":
      return {
        field: "email",
        message: "User not found. Please check your email or sign up.",
      };
    case "email_not_confirmed":
      return {
        field: "email",
        message: "Please confirm your email address before signing in.",
      };
    case "user_already_registered":
      return {
        field: "email",
        message:
          "This email is already registered. Please use a different email or try signing in.",
      };
    case "signup_disabled":
      return {
        message:
          "Sign-ups are currently disabled. Please contact support for assistance.",
      };
    case "weak_password":
      return {
        field: "password",
        message: "Password is too weak. Please use a stronger password.",
      };
    case "email_address_not_authorized":
      return {
        field: "email",
        message:
          "This email address is not authorized. Please use a different email or contact support.",
      };
    case "too_many_requests":
      return { message: "Too many attempts. Please try again later." };
    default:
      console.error("Unhandled Supabase auth error:", error);
      return {
        message:
          "An unexpected error occurred. Please try again or contact support.",
      };
  }
}

export function handleSupabaseAuthSignUpErrors(
  error: AuthError,
): AuthFormErrorReturnType {
  switch (error.code) {
    case "user_already_exists":
      return {
        field: "email",
        message:
          "This email is already registered. Please use a different email or try signing in.",
      };
    case "email_signup_disabled":
      return {
        message:
          "Email sign-ups are currently disabled. Please use another method or contact support.",
      };
    case "password_too_short":
      return {
        field: "password",
        message:
          "Password is too short. Please use a password with at least 6 characters.",
      };
    case "email_invalid":
      return {
        field: "email",
        message: "Invalid email address. Please enter a valid email.",
      };
    case "username_taken":
      return {
        field: "username",
        message:
          "This username is already taken. Please choose a different username.",
      };
    default:
      return handleSupabaseAuthEmailPasswordFormErrors(error);
  }
}

export function handleSupabaseAuthPasswordSignUpErrors(
  error: AuthError,
): AuthFormErrorReturnType {
  console.log("--------------------------------");
  console.log("error", error);
  if (!error.code && error.message) {
    return { message: error.message };
  }
  switch (error.code) {
    case "user_already_exists":
      return {
        field: "email",
        message:
          "This email is already registered. Please use a different email or try signing in.",
      };
    case "email_signup_disabled":
      return {
        message:
          "Email sign-ups are currently disabled. Please use another method or contact support.",
      };
    case "password_too_short":
      return {
        field: "password",
        message:
          "Password is too short. Please use a password with at least 6 characters.",
      };
    case "email_invalid":
      return {
        field: "email",
        message: "Invalid email address. Please enter a valid email.",
      };
    case "username_taken":
      return {
        field: "username",
        message:
          "This username is already taken. Please choose a different username.",
      };
    default:
      return handleSupabaseAuthEmailPasswordFormErrors(error);
  }
}

export function handleSupabaseAuthPasswordResetErrors(
  error: AuthError,
): AuthFormErrorReturnType {
  switch (error.code) {
    case "user_not_found":
      return {
        field: "email",
        message: "No account found with this email address.",
      };
    case "reset_password_invalid_token":
      return {
        message:
          "Invalid or expired password reset token. Please request a new password reset.",
      };
    case "too_many_password_resets":
      return {
        message: "Too many password reset attempts. Please try again later.",
      };
    default:
      return handleSupabaseAuthEmailPasswordFormErrors(error);
  }
}

export function handleSupabaseAuthGeneralErrors(
  error: AuthError,
): AuthFormErrorReturnType {
  switch (error.code) {
    case "auth_session_missing":
      return {
        message: "Authentication session is missing. Please sign in again.",
      };
    case "auth_invalid_token":
      return { message: "Invalid authentication token. Please sign in again." };
    case "auth_invalid_refresh_token":
      return { message: "Invalid refresh token. Please sign in again." };
    case "auth_api_error":
      return {
        message: "Authentication service error. Please try again later.",
      };
    case "auth_invalid_credentials":
      return {
        message: "Invalid credentials. Please check your email and password.",
      };
    case "auth_mfa_required":
      return {
        message:
          "Multi-factor authentication is required. Please complete the MFA process.",
      };
    default:
      console.error("Unhandled Supabase general auth error:", error);
      return {
        message:
          "An unexpected authentication error occurred. Please try again or contact support.",
      };
  }
}

export function handleSupabaseAuthSignInErrors(
  error: AuthError,
): AuthFormErrorReturnType {
  if (!error.code && error.message) {
    return { message: error.message };
  }
  switch (error.code) {
    case "invalid_credentials":
      return { message: "Invalid email or password. Please try again." };
    case "user_not_found":
      return {
        field: "email",
        message: "User not found. Please check your email or sign up.",
      };
    case "email_not_confirmed":
      return {
        field: "email",
        message: "Please confirm your email address before signing in.",
      };
    case "invalid_login_credentials":
      return {
        message:
          "Invalid login credentials. Please check your email and password.",
      };
    case "too_many_attempts":
      return { message: "Too many sign-in attempts. Please try again later." };
    default:
      return handleSupabaseAuthEmailPasswordFormErrors(error);
  }
}

export function handleSupabaseAuthMagicLinkErrors(
  error: AuthError,
): AuthFormErrorReturnType {
  switch (error.code) {
    case "user_not_found":
      return {
        field: "email",
        message:
          "No account found with this email address. Please sign up first.",
      };
    case "too_many_attempts":
      return {
        message: "Too many magic link requests. Please try again later.",
      };
    case "email_not_confirmed":
      return {
        field: "email",
        message:
          "Please confirm your email address before requesting a magic link.",
      };
    case "invalid_email":
      return {
        field: "email",
        message: "Invalid email address. Please enter a valid email.",
      };
    default:
      return handleSupabaseAuthGeneralErrors(error);
  }
}

export function handleSupabaseAuthResetPasswordErrors(
  error: AuthError,
): AuthFormErrorReturnType {
  switch (error.code) {
    case "user_not_found":
      return {
        field: "email",
        message: "No account found with this email address.",
      };
    case "reset_password_invalid_token":
      return {
        message:
          "Invalid or expired password reset token. Please request a new password reset.",
      };
    case "too_many_password_resets":
      return {
        message: "Too many password reset attempts. Please try again later.",
      };
    case "invalid_email":
      return {
        field: "email",
        message: "Invalid email address. Please enter a valid email.",
      };
    default:
      return handleSupabaseAuthGeneralErrors(error);
  }
}

type GenericFormErrorReturnType = {
  message: string;
  field?: string;
};

export function handleFlattenedValidationErrors(flattenedErrors: {
  formErrors?: string[] | undefined;
  fieldErrors?: Record<string, string[]> | undefined;
}): GenericFormErrorReturnType {
  if (flattenedErrors.formErrors && flattenedErrors.formErrors.length > 0) {
    return { message: flattenedErrors.formErrors.join("\n") };
  }
  if (flattenedErrors.fieldErrors) {
    const keys = Object.keys(flattenedErrors.fieldErrors);
    if (keys.length === 1) {
      // find first field that has errors
      const field = keys.find(
        (key) => flattenedErrors.fieldErrors?.[key]?.length,
      );
      if (field) {
        return { message: flattenedErrors.fieldErrors[field].join("\n") };
      }
    }
  }
  return {
    message:
      "An unexpected error occurred. Please try again or contact support.",
  };
}

type SafeActionError<T extends ZodSchema> = {
  validationErrors?: ValidationErrors<z.infer<T>>;
  serverError?: string;
};

/**
 * Handles typed validation errors from a Zod schema.
 *
 * @template T - A Zod schema type.
 * @param {ValidationErrors<z.infer<T>>} errors - The validation errors object from Zod.
 * @returns {{ message: string; field?: keyof z.infer<T> }} An object containing an error message and optionally a field name.
 *
 * @description
 * This function processes validation errors from a Zod schema and returns a user-friendly error message.
 * It handles both form-level errors and field-specific errors.
 *
 * The function follows these steps:
 * 1. Flattens the validation errors using the `flattenValidationErrors` function.
 * 2. Checks for form-level errors first. If present, it joins them into a single string.
 * 3. If no form-level errors, it processes field-specific errors:
 *    - If there's only one field with errors, it returns the error message(s) for that field along with the field name.
 *    - If there are multiple fields with errors, it concatenates all error messages into a single string.
 * 4. If no errors are found, it returns a generic error message.
 *
 * @example
 * const errors = { fieldErrors: { email: ["Invalid email format"] } };
 * const result = handleTypedValidationErrors(errors);
 * // Result: { message: "Invalid email format", field: "email" }
 */
function handleTypedValidationErrors<T extends ZodSchema>(
  errors: ValidationErrors<z.infer<T>>,
): { message: string; field?: keyof z.infer<T> } {
  const flattenedErrors = flattenValidationErrors(errors);
  if (flattenedErrors.formErrors && flattenedErrors.formErrors.length > 0) {
    return { message: flattenedErrors.formErrors.join("\n") };
  }
  if (flattenedErrors.fieldErrors) {
    const keys = Object.keys(flattenedErrors.fieldErrors);
    if (keys.length === 1) {
      const field = keys[0];
      const fieldErrors = flattenedErrors.fieldErrors[field];
      if (fieldErrors && fieldErrors.length > 0) {
        return { message: fieldErrors.join("\n"), field };
      }
    }
    // If there are multiple field errors, concatenate them
    const allErrors = keys.flatMap(
      (key) => flattenedErrors.fieldErrors?.[key] || [],
    );
    if (allErrors.length > 0) {
      return { message: allErrors.join("\n") };
    }
  }
  return {
    message:
      "An unexpected error occurred. Please try again or contact support.",
  };
}

/**
 * Retrieves an error message from a SafeActionError object.
 * This function is specifically designed for use with toast notifications.
 *
 * @param error - The SafeActionError object containing validation errors or server errors.
 * @returns A string message suitable for display in a toast notification.
 *
 * @remarks
 * This function handles both validation errors and server errors.
 * For validation errors, it uses the handleTypedValidationErrors function to generate a user-friendly message.
 * For server errors, it returns the error message directly.
 * If no specific error is found, it returns a generic error message.
 */
export function getSafeActionErrorMessage<T extends ZodSchema>(
  error: SafeActionError<z.infer<T>>,
  fallbackMessage?: string,
): string {
  if (error.serverError) {
    return error.serverError;
  }
  if (error.validationErrors) {
    return handleTypedValidationErrors(error.validationErrors).message;
  }

  return (
    fallbackMessage ||
    "An unexpected error occurred. Please try again or contact support."
  );
}
