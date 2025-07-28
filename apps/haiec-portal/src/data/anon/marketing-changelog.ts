"use server";
import type { Tables } from "@/lib/database.types";
import { supabaseAnonClient } from "@/supabase-clients/anon/supabaseAnonClient";

export async function anonGetAllChangelogItems(): Promise<
  Tables<"marketing_changelog">[]
> {
  const changelogItemsResponse = await supabaseAnonClient
    .from("marketing_changelog")
    .select("*")
    .order("created_at", { ascending: false });

  if (changelogItemsResponse.error) {
    throw changelogItemsResponse.error;
  }

  if (!changelogItemsResponse.data) {
    throw new Error("No data found");
  }

  return changelogItemsResponse.data;
}
