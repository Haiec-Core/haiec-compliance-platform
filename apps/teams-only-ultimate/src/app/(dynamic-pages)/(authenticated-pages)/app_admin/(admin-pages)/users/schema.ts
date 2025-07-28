import { z } from "zod";

export const appAdminUserFiltersSchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  query: z.string().optional(),
});

export type AppAdminUserFiltersSchema = z.infer<
  typeof appAdminUserFiltersSchema
>;
