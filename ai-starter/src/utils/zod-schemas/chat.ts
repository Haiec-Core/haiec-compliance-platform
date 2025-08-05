import { z } from "zod";

/**
 * Schema for chat visibility
 */
export const chatVisibilitySchema = z.object({
    chatId: z.string().uuid(),
    visibility: z.enum(["private", "public"])
});

export type ChatVisibility = z.infer<typeof chatVisibilitySchema>;
