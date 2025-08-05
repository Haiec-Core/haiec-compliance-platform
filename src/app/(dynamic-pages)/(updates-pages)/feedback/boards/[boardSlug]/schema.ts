import { z } from "zod";

export const boardFiltersSchema = z.object({
  page: z.coerce.number().default(1),
  sort: z.enum(["newest", "oldest", "most_popular"]).default("newest"),
  status: z.enum(["all", "open", "in_progress", "completed"]).default("all"),
});

export type BoardFilters = z.infer<typeof boardFiltersSchema>;
