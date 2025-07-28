"use server";

import { supabaseAdminClient } from "@/supabase-clients/admin/supabaseAdminClient";
import { supabaseAnonClient } from "@/supabase-clients/anon/supabaseAnonClient";
import { createSupabaseUserServerActionClient } from "@/supabase-clients/user/createSupabaseUserServerActionClient";
import { serverGetUserType } from "@/utils/server/serverGetUserType";
import { userRoles } from "@/utils/userTypes";

export async function supabaseClientBasedOnUserRole() {
  const userRoleType = await serverGetUserType();

  const supabaseClient = {
    [userRoles.ANON]: () => supabaseAnonClient,
    [userRoles.ADMIN]: () => supabaseAdminClient,
    [userRoles.USER]: async () => await createSupabaseUserServerActionClient(),
  }[userRoleType]();

  return supabaseClient;
}
