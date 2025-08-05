"use server";

import { authActionClient } from "@/lib/safe-action";
import { createSupabaseUserServerActionClient } from "@/supabase-clients/user/createSupabaseUserServerActionClient";

export const refreshSessionAction = authActionClient.action(async () => {
  const supabaseClient = await createSupabaseUserServerActionClient();
  const { error } = await supabaseClient.auth.refreshSession();

  if (error) {
    throw new Error(error.message);
  }

  // Return void if successful
});
