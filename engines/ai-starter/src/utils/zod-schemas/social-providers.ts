import { z } from "zod";

export const socialProviders = z.enum(["google", "github", "twitter"]);

export type SocialProvider = z.infer<typeof socialProviders>;
