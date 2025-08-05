import { RESTRICTED_SLUG_NAMES, SLUG_PATTERN } from "@/constants";
import { Enum } from "@/types";
import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().min(1, "Workspace name is required"),
  slug: z
    .string()
    .refine(
      (slug) =>
        !RESTRICTED_SLUG_NAMES.includes(slug) && SLUG_PATTERN.test(slug),
      {
        message: "Invalid or restricted slug",
      },
    )
    .optional(),
  workspaceType: z.enum(["solo", "team"]).default("solo"),
  isOnboardingFlow: z.boolean().optional().default(false),
});

export type CreateWorkspaceSchema = z.infer<typeof createWorkspaceSchema>;

export const workspaceMemberRoleEnum = z.enum([
  "owner",
  "admin",
  "member",
  "readonly",
]);

export type WorkspaceMemberRoleEnum = z.infer<typeof workspaceMemberRoleEnum>;
type DBWorkspaceMemberRoleEnum = Enum<"workspace_member_role_type">;

// Check if WorkspaceMemberRoleEnum and DBWorkspaceMemberRoleEnum are equivalent
type RoleEnumEquivalence =
  WorkspaceMemberRoleEnum extends DBWorkspaceMemberRoleEnum
    ? DBWorkspaceMemberRoleEnum extends WorkspaceMemberRoleEnum
      ? true
      : false
    : false;

// This will cause a type error if the types are not equivalent
type AssertRoleEnumEquivalence = RoleEnumEquivalence extends true
  ? true
  : never;

// Usage: Don't remove this, it's used to ensure that the types are equivalent
const _assertRoleEnumEquivalence: AssertRoleEnumEquivalence = true;

export const workspaceMemberRoleToLabel = (role: WorkspaceMemberRoleEnum) => {
  switch (role) {
    case "owner":
      return "Owner";
    case "admin":
      return "Admin";
    case "member":
      return "Member";
    case "readonly":
      return "Read-only";
  }
};
