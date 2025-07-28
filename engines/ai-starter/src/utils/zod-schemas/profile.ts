import { z } from "zod";

export const updateUserFullNameSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  isOnboardingFlow: z.boolean().optional().default(false),
});

export type UpdateUserFullNameSchema = z.infer<typeof updateUserFullNameSchema>;

export const profileUpdateFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
});

export type ProfileUpdateFormSchema = z.infer<typeof profileUpdateFormSchema>;
