import { z } from "zod";

// Define a more specific type for json_content
const jsonContentSchema = z.record(z.unknown());

export const marketingBlogPostSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  content: z.string().optional().default(""),
  is_featured: z.boolean().optional(), // Has default value in migration
  status: z.enum(["draft", "published"]).optional(), // Has default value in migration
  cover_image: z.string().nullable().optional(),
  seo_data: z.record(z.unknown()).optional().default({}),
  json_content: jsonContentSchema.optional(), // Has default value in migration
  created_at: z.string().optional(), // Has default value in migration
  updated_at: z.string().optional(), // Has default value in migration
});

export const createMarketingBlogPostSchema = marketingBlogPostSchema.omit({
  created_at: true,
  updated_at: true,
});

export const createMarketingBlogPostActionSchema = createMarketingBlogPostSchema
  .omit({
    json_content: true,
    seo_data: true,
  })
  .extend({
    stringified_json_content: z.string(),
    stringified_seo_data: z.string(),
  });

export const updateMarketingBlogPostSchema = marketingBlogPostSchema
  .partial()
  .extend({
    id: z.string().uuid(),
  });

export const updateMarketingBlogPostActionSchema = updateMarketingBlogPostSchema
  .omit({
    json_content: true,
    seo_data: true,
  })
  .extend({
    stringified_json_content: z.string(),
    stringified_seo_data: z.string(),
  });

export const deleteMarketingBlogPostSchema = z.object({
  id: z.string().uuid(),
});

export const updateBlogPostAuthorsSchema = z.object({
  postId: z.string().uuid(),
  authorIds: z.array(z.string().uuid()),
});

export const updateBlogPostTagsSchema = z.object({
  postId: z.string().uuid(),
  tagIds: z.array(z.string().uuid()),
});
