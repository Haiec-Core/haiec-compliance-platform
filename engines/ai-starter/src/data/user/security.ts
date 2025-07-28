"use server";
import { authActionClient } from "@/lib/safe-action";
import { createSupabaseUserServerActionClient } from "@/supabase-clients/user/createSupabaseUserServerActionClient";
import { z } from "zod";

const updatePasswordSchema = z.object({
  password: z.string().min(4),
});

export const updatePasswordAction = authActionClient
  .schema(updatePasswordSchema)
  .action(async ({ parsedInput: { password } }) => {
    const supabaseClient = await createSupabaseUserServerActionClient();
    const { error } = await supabaseClient.auth.updateUser({
      password,
    });

    if (error) {
      throw new Error(error.message);
    }
  });

const updateEmailSchema = z.object({
  email: z.string().email(),
});

export const updateEmailAction = authActionClient
  .schema(updateEmailSchema)
  .action(async ({ parsedInput: { email } }) => {
    const supabaseClient = await createSupabaseUserServerActionClient();
    const { error } = await supabaseClient.auth.updateUser({
      email,
    });

    if (error) {
      throw new Error(error.message);
    }

    // Return void if successful
  });
