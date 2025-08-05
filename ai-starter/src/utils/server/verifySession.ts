"use server";
import { createSupabaseUserServerComponentClient } from "@/supabase-clients/user/createSupabaseUserServerComponentClient";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getSession = cache(async () => {
  const supabase = await createSupabaseUserServerComponentClient();
  return await supabase.auth.getSession();
});

export const getUser = cache(async () => {
  const supabase = await createSupabaseUserServerComponentClient();
  return await supabase.auth.getUser();
});

// This is a server-side function that verifies the session of the user.
// and runs in server components.
export const verifySession = cache(async () => {
  try {
    const {
      data: { session },
      error: sessionError,
    } = await getSession();

    if (sessionError) {
      throw sessionError;
    }

    if (!session?.user) {
      redirect("/login");
    }
  } catch (error) {
    redirect("/login");
  }
});
