"use server";

import { adminActionClient } from "@/lib/safe-action";
import { supabaseAdminClient } from "@/supabase-clients/admin/supabaseAdminClient";
import {
  createMarketingTagSchema,
  deleteMarketingTagSchema,
  updateMarketingTagSchema,
} from "@/utils/zod-schemas/marketingTags";
import { revalidatePath } from "next/cache";

/**
 * Creates a new marketing tag.
 */
export const createTagAction = adminActionClient
  .schema(createMarketingTagSchema)
  .action(async ({ parsedInput }) => {
    const { data, error } = await supabaseAdminClient
      .from("marketing_tags")
      .insert(parsedInput)
      .select()
      .single();

    if (error) throw new Error(error.message);

    revalidatePath("/", "layout");
    return data;
  });

/**
 * Updates an existing marketing tag.
 */
export const updateTagAction = adminActionClient
  .schema(updateMarketingTagSchema)
  .action(async ({ parsedInput }) => {
    const { id, ...updateData } = parsedInput;

    const { data, error } = await supabaseAdminClient
      .from("marketing_tags")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);

    revalidatePath("/", "layout");
    return data;
  });

/**
 * Deletes a marketing tag.
 */
export const deleteTagAction = adminActionClient
  .schema(deleteMarketingTagSchema)
  .action(async ({ parsedInput: { id } }) => {
    const { error } = await supabaseAdminClient
      .from("marketing_tags")
      .delete()
      .eq("id", id);

    if (error) throw new Error(error.message);

    revalidatePath("/", "layout");
    return { message: "Tag deleted successfully" };
  });

/**
 * Retrieves all marketing tags.
 */
export async function getAllTags() {
  const { data, error } = await supabaseAdminClient
    .from("marketing_tags")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);

  return data;
}

/**
 * Retrieves a single marketing tag by ID.
 */
export async function getTagById(id: string) {
  const { data, error } = await supabaseAdminClient
    .from("marketing_tags")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
}
