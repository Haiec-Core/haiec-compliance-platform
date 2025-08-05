import { z } from "zod";

export const createMarketingTagSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string().optional(),
});

export const updateMarketingTagSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  name: z.string(),
  description: z.string().optional(),
});

export const deleteMarketingTagSchema = z.object({
  id: z.string().uuid(),
});
