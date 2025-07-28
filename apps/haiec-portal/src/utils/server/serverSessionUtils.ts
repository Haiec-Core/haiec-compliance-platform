"use server";
import { createSupabaseUserServerComponentClient } from "@/supabase-clients/user/createSupabaseUserServerComponentClient";
import { cache } from "react";

export const getSession = cache(async () => {
  const supabase = await createSupabaseUserServerComponentClient();
  return await supabase.auth.getSession();
});

export const getUser = cache(async () => {
  const supabase = await createSupabaseUserServerComponentClient();
  return await supabase.auth.getUser();
});
