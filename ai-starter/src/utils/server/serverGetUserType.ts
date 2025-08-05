"use server";
import { createSupabaseUserServerComponentClient } from "@/supabase-clients/user/createSupabaseUserServerComponentClient";
import { userRoles } from "@/utils/userTypes";
import { cache } from "react";
import { isSupabaseUserAppAdmin } from "../isSupabaseUserAppAdmin";

// make sure to return one of UserRoles
export const serverGetUserType = cache(async () => {
  const supabase = await createSupabaseUserServerComponentClient();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    throw sessionError;
  }

  if (!session?.user) {
    return userRoles.ANON;
  }

  if (isSupabaseUserAppAdmin(session.user)) {
    return userRoles.ADMIN;
  }

  return userRoles.USER;
});
