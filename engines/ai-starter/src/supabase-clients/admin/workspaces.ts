import { supabaseAdminClient } from "./supabaseAdminClient";

export async function superAdminGetWorkspaceAdmins(
  workspaceId: string,
): Promise<string[]> {
  const { data, error } = await supabaseAdminClient
    .from("workspace_members")
    .select("*")
    .eq("workspace_id", workspaceId)
    .or('workspace_member_role.in.("admin","owner")');

  if (error) {
    throw error;
  }

  return data.map(({ workspace_member_id }) => workspace_member_id);
}
