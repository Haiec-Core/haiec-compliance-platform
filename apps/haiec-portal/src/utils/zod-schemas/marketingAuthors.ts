// src/utils/zod-schemas/marketingAuthors.ts
import { z } from "zod";

// Schema for creating a new author profile
export const createMarketingAuthorProfileSchema = z.object({
  slug: z.string(),
  display_name: z.string(),
  bio: z.string(),
  avatar_url: z.string(),
  website_url: z.string().url().optional(),
  twitter_handle: z.string().optional(),
  facebook_handle: z.string().optional(),
  linkedin_handle: z.string().optional(),
  instagram_handle: z.string().optional(),
});

// Schema for updating an existing author profile
export const updateMarketingAuthorProfileSchema =
  createMarketingAuthorProfileSchema.partial().extend({
    id: z.string().uuid(),
  });

// Schema for deleting an author profile
export const deleteMarketingAuthorProfileSchema = z.object({
  id: z.string().uuid(),
});
