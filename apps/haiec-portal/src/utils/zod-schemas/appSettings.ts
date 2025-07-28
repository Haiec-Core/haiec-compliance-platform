import { z } from "zod";

export const appSettingsJSONBSchema = z.object({
  feedbackPostModerationEnabled: z.boolean().default(false),
  feedbackCommentModerationEnabled: z.boolean().default(false),
  shouldSendEmailForNotifications: z.boolean().default(false),
});
