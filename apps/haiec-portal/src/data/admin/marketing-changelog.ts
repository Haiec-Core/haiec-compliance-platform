"use server";

import { adminActionClient } from "@/lib/safe-action";
import { supabaseAdminClient } from "@/supabase-clients/admin/supabaseAdminClient";
import {
  createMarketingChangelogActionSchema,
  deleteMarketingChangelogSchema,
  updateChangelogAuthorsSchema,
  updateMarketingChangelogActionSchema,
} from "@/utils/zod-schemas/marketingChangelog";
import { revalidatePath } from "next/cache";
import urlJoin from "url-join";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { zfd } from "zod-form-data";

export const createChangelogAction = adminActionClient
  .schema(createMarketingChangelogActionSchema)
  .action(async ({ parsedInput }) => {
    const { stringified_json_content, ...createData } = parsedInput;
    const jsonContent = JSON.parse(stringified_json_content);
    const { data, error } = await supabaseAdminClient
      .from("marketing_changelog")
      .insert({
        ...createData,
        json_content: jsonContent,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    revalidatePath("/", "layout");
    return data;
  });

export const updateChangelogAction = adminActionClient
  .schema(updateMarketingChangelogActionSchema)
  .action(async ({ parsedInput }) => {
    const { id, stringified_json_content, ...updateData } = parsedInput;
    const jsonContent = JSON.parse(stringified_json_content);
    const { data, error } = await supabaseAdminClient
      .from("marketing_changelog")
      .update({
        ...updateData,
        json_content: jsonContent,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);

    revalidatePath("/", "layout");
    return data;
  });

export const deleteChangelogAction = adminActionClient
  .schema(deleteMarketingChangelogSchema)
  .action(async ({ parsedInput: { id } }) => {
    const { error } = await supabaseAdminClient
      .from("marketing_changelog")
      .delete()
      .eq("id", id);

    if (error) throw new Error(error.message);

    revalidatePath("/", "layout");
    return { message: "Changelog deleted successfully" };
  });

export const updateChangelogAuthorsAction = adminActionClient
  .schema(updateChangelogAuthorsSchema)
  .action(async ({ parsedInput: { changelogId, authorIds } }) => {
    const { error: deleteError } = await supabaseAdminClient
      .from("marketing_changelog_author_relationship")
      .delete()
      .eq("changelog_id", changelogId);

    if (deleteError) throw new Error(deleteError.message);

    const authorRelations = authorIds.map((authorId) => ({
      changelog_id: changelogId,
      author_id: authorId,
    }));

    const { error: insertError } = await supabaseAdminClient
      .from("marketing_changelog_author_relationship")
      .insert(authorRelations);

    if (insertError) throw new Error(insertError.message);

    revalidatePath("/", "layout");
    return { message: "Changelog authors updated successfully" };
  });

export async function getAllChangelogs() {
  const { data, error } = await supabaseAdminClient
    .from("marketing_changelog")
    .select(
      `
      *,
      marketing_changelog_author_relationship(author_id)
    `,
    )
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
}

export async function getChangelogById(id: string) {
  const { data, error } = await supabaseAdminClient
    .from("marketing_changelog")
    .select(
      `
      *,
      marketing_changelog_author_relationship(author_id)
    `,
    )
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

const formDataSchema = zfd.formData({
  file: zfd.file(),
});

const uploadChangelogCoverImageSchema = z.object({
  formData: formDataSchema,
});

export const uploadChangelogCoverImageAction = adminActionClient
  .schema(uploadChangelogCoverImageSchema)
  .action(async ({ parsedInput: { formData } }) => {
    const { file } = formData;

    const fileExtension = file.name.split(".").pop();
    const uniqueFilename = `${uuidv4()}.${fileExtension}`;
    const changelogImagesPath = `marketing/changelog-images/${uniqueFilename}`;

    const { data, error } = await supabaseAdminClient.storage
      .from("marketing-assets")
      .upload(changelogImagesPath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      throw new Error(error.message);
    }

    const { path } = data;

    const filePath = path.split(",")[0];
    const supabaseFileUrl = urlJoin(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      "/storage/v1/object/public/marketing-assets",
      filePath,
    );

    return supabaseFileUrl;
  });
