// src/data/admin/marketing-authors.ts
"use server";
import { adminActionClient } from "@/lib/safe-action";
import { supabaseAdminClient } from "@/supabase-clients/admin/supabaseAdminClient";
import {
  createMarketingAuthorProfileSchema,
  deleteMarketingAuthorProfileSchema,
  updateMarketingAuthorProfileSchema,
} from "@/utils/zod-schemas/marketingAuthors";
import { revalidatePath } from "next/cache";
import urlJoin from "url-join";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { zfd } from "zod-form-data";

/**
 * Creates a new marketing author profile.
 *
 * This action inserts a new author profile into the database with the provided information.
 * It uses admin privileges to perform the operation and revalidates the relevant paths.
 *
 * @param {Object} input - The author profile data to be inserted.
 * @returns {Promise<Object>} The newly created author profile data.
 */
export const createAuthorProfileAction = adminActionClient
  .schema(createMarketingAuthorProfileSchema)
  .action(async ({ parsedInput }) => {
    const { data, error } = await supabaseAdminClient
      .from("marketing_author_profiles")
      .insert(parsedInput)
      .select()
      .single();

    if (error) throw new Error(error.message);

    revalidatePath("/", "layout");
    return data;
  });

/**
 * Updates an existing marketing author profile.
 *
 * This action updates the specified author profile in the database with the provided information.
 * It uses admin privileges to perform the operation and revalidates the relevant paths.
 *
 * @param {Object} input - The updated author profile data, including the profile ID.
 * @returns {Promise<Object>} The updated author profile data.
 */
export const updateAuthorProfileAction = adminActionClient
  .schema(updateMarketingAuthorProfileSchema)
  .action(async ({ parsedInput }) => {
    const { id, ...updateData } = parsedInput;

    const { data, error } = await supabaseAdminClient
      .from("marketing_author_profiles")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);

    revalidatePath("/", "layout");
    return data;
  });

/**
 * Deletes a marketing author profile.
 *
 * This action removes the specified author profile from the database.
 * It uses admin privileges to perform the operation and revalidates the relevant paths.
 *
 * @param {Object} input - The ID of the author profile to be deleted.
 * @returns {Promise<Object>} A success message confirming the deletion.
 */
export const deleteAuthorProfileAction = adminActionClient
  .schema(deleteMarketingAuthorProfileSchema)
  .action(async ({ parsedInput: { id } }) => {
    const { error } = await supabaseAdminClient
      .from("marketing_author_profiles")
      .delete()
      .eq("id", id);

    if (error) throw new Error(error.message);

    revalidatePath("/", "layout");
    return { message: "Author profile deleted successfully" };
  });

/**
 * Retrieves all marketing author profiles.
 *
 * This function fetches all author profiles from the database.
 * It's not an action, but a server-side function that can be used in server components or other server actions.
 *
 * @returns {Promise<Array>} An array of all author profiles.
 */
export async function getAllAuthorProfiles() {
  const { data, error } = await supabaseAdminClient
    .from("marketing_author_profiles")
    .select("*")
    .order("display_name", { ascending: true });

  if (error) throw new Error(error.message);

  return data;
}

/**
 * Retrieves a single marketing author profile by ID.
 *
 * This function fetches a specific author profile from the database using its ID.
 * It's not an action, but a server-side function that can be used in server components or other server actions.
 *
 * @param {string} id - The ID of the author profile to retrieve.
 * @returns {Promise<Object>} The requested author profile data.
 */
export async function getAuthorProfileById(id: string) {
  const { data, error } = await supabaseAdminClient
    .from("marketing_author_profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

// Schema for handling form data, specifically for file uploads
const formDataSchema = zfd.formData({
  file: zfd.file(),
});

// Schema for uploading marketing author images
const uploadMarketingAuthorImageSchema = z.object({
  formData: formDataSchema,
});

/**
 * Uploads a marketing author image.
 *
 * This action uploads an image file to the storage and returns the public URL of the uploaded image.
 * It uses admin privileges to perform the operation.
 *
 * @param {Object} input - The form data containing the file to be uploaded.
 * @returns {Promise<string>} The public URL of the uploaded image.
 */
export const uploadMarketingAuthorImageAction = adminActionClient
  .schema(uploadMarketingAuthorImageSchema)
  .action(async ({ parsedInput: { formData } }) => {
    const { file } = formData;

    // Extract file extension and generate a unique filename
    const fileExtension = file.name.split(".").pop();
    const uniqueFilename = `${uuidv4()}.${fileExtension}`;
    const userImagesPath = `marketing/author-images/${uniqueFilename}`;

    const { data, error } = await supabaseAdminClient.storage
      .from("marketing-assets")
      .upload(userImagesPath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      throw new Error(error.message);
    }

    const { path } = data;

    // Construct the public URL for the uploaded file
    const filePath = path.split(",")[0];
    const supabaseFileUrl = urlJoin(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      "/storage/v1/object/public/marketing-assets",
      filePath,
    );

    return supabaseFileUrl;
  });
