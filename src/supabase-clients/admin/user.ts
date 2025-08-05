import { supabaseAdminClient } from "./supabaseAdminClient";

export async function superAdminGetUserIdByEmail(
  email: string,
): Promise<string | null> {
  const { data, error } = await supabaseAdminClient
    .from("user_application_settings")
    .select("id")
    .eq("email_readonly", email)
    .single();

  if (error) {
    console.error("Error fetching user ID:", error);
    return null;
  }

  return data?.id || null;
}
