import { z } from "zod";

export const organizationSlugParamSchema = z.object({
  organizationSlug: z.string(),
});

export const workspaceSlugParamSchema = z.object({
  workspaceSlug: z.string(),
});

