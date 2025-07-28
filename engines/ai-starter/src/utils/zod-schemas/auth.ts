import { z } from "zod";
import { socialProviders } from "./social-providers";

export const signUpWithPasswordSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  next: z.string().nullish().optional(),
});

export type SignUpWithPasswordSchemaType = z.infer<
  typeof signUpWithPasswordSchema
>;

export const signInWithMagicLinkSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  next: z.string().nullish().optional(),
  shouldCreateUser: z.boolean().optional().default(false),
});

export type signInWithMagicLinkSchemaType = z.infer<
  typeof signInWithMagicLinkSchema
>;

export const signInWithProviderSchema = z.object({
  provider: socialProviders,
  next: z.string().nullish().optional(),
});

export type SignInWithProviderSchemaType = z.infer<
  typeof signInWithProviderSchema
>;

export const resetPasswordSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
});

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

export const signInWithPasswordSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  next: z.string().nullish().optional(),
});

export type SignInWithPasswordSchemaType = z.infer<
  typeof signInWithPasswordSchema
>;
