import { User } from "@supabase/supabase-js";

export function isSupabaseUserAppAdmin(user: User): boolean {
  if (user.app_metadata && "user_role" in user.app_metadata) {
    return user.app_metadata.user_role === "admin";
  }
  return false;
}
