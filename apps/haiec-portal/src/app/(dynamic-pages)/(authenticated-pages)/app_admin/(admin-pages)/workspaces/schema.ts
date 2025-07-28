import { z } from "zod";

export const appAdminWorkspacesFiltersSchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  query: z.string().optional(),
  limit: z.number().optional().default(10),
});

export type AppAdminWorkspacesFiltersSchema = z.infer<
  typeof appAdminWorkspacesFiltersSchema
>;
