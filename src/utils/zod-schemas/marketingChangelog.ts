import { z } from "zod";

export const marketingChangelogSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, "Title is required"),
  json_content: z.record(z.unknown()).default({}),
  status: z.enum(["draft", "published"]),
  cover_image: z.string().nullable().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const createMarketingChangelogSchema = marketingChangelogSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const createMarketingChangelogActionSchema =
  createMarketingChangelogSchema
    .extend({
      stringified_json_content: z.string(),
    })
    .omit({
      json_content: true,
    });

export const updateMarketingChangelogSchema = marketingChangelogSchema;

export const updateMarketingChangelogActionSchema =
  updateMarketingChangelogSchema
    .extend({
      stringified_json_content: z.string(),
    })
    .omit({
      json_content: true,
    });

export const deleteMarketingChangelogSchema = z.object({
  id: z.string().uuid(),
});

export const updateChangelogAuthorsSchema = z.object({
  changelogId: z.string().uuid(),
  authorIds: z.array(z.string().uuid()),
});
