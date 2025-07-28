"use server";
import { supabaseAnonClient } from "@/supabase-clients/anon/supabaseAnonClient";

export const anonGetAllMarketingAuthors = async () => {
  const { data, error } = await supabaseAnonClient
    .from("marketing_author_profiles")
    .select("*")
    .order("display_name", { ascending: true });

  if (error) {
    throw error;
  }

  return data;
};

export const anonGetMarketingAuthorById = async (authorId: string) => {
  const { data, error } = await supabaseAnonClient
    .from("marketing_author_profiles")
    .select("*")
    .eq("id", authorId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const anonGetMarketingAuthorBySlug = async (slug: string) => {
  const { data, error } = await supabaseAnonClient
    .from("marketing_author_profiles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    throw error;
  }

  return data;
};
