import { Database } from "@/lib/database.types";
import { createClient } from "@supabase/supabase-js";
import { Client } from "pg";

export function createSupabaseTestAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

export function createPGClient() {
  return new Client({
    connectionString: process.env.SUPABASE_POSTGRES_DB_URL,
  });
}

export async function getUserIdByEmail(emailAddress: string) {
  // Find the user ID for the email
  const supabaseTestAdminClient = createSupabaseTestAdminClient();
  const userIdRes = await supabaseTestAdminClient
    .from("user_application_settings")
    .select("*")
    .eq("email_readonly", emailAddress)
    .single();

  const { data, error } = userIdRes;
  if (error) {
    throw error;
  }
  return data.id;
}

export async function getWorkspaceInvitationId(inviteeUserId: string) {
  // Find the user ID for the email
  const supabaseTestAdminClient = createSupabaseTestAdminClient();
  const userIdRes = await supabaseTestAdminClient
    .from("workspace_invitations")
    .select("*")
    .eq("inviter_user_id", inviteeUserId)
    .single();

  const { data, error } = userIdRes;
  if (error) {
    throw error;
  }
  return data.id;
}
