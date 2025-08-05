import { z } from "zod";

export const generateImageSchema = z.object({
  prompt: z.string(),
  size: z.enum(["256x256", "512x512", "1024x1024"]),
  n: z.number().int().positive().max(10).default(1),
});

export type GenerateImageSchemaType = z.infer<typeof generateImageSchema>;
