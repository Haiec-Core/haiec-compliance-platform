// @/data/admin/marketing-blog.ts
"use server";

import { adminActionClient } from "@/lib/safe-action";
import { supabaseAdminClient } from "@/supabase-clients/admin/supabaseAdminClient";
import {
  createMarketingBlogPostActionSchema,
  deleteMarketingBlogPostSchema,
  updateBlogPostAuthorsSchema,
  updateBlogPostTagsSchema,
  updateMarketingBlogPostActionSchema,
} from "@/utils/zod-schemas/marketingBlog";
import { revalidatePath } from "next/cache";
import urlJoin from "url-join";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { zfd } from "zod-form-data";

/**
 * Creates a new marketing blog post.
 * Utilizes the admin action client to insert a new post into the database.
 * Revalidates the cache path to ensure the new post is reflected in the UI.
 */
export const createBlogPostAction = adminActionClient
  .schema(createMarketingBlogPostActionSchema)
  .action(async ({ parsedInput }) => {
    const { stringified_json_content, stringified_seo_data, ...createData } =
      parsedInput;
    const jsonContent = JSON.parse(stringified_json_content);
    const seoData = JSON.parse(stringified_seo_data);
    const { data, error } = await supabaseAdminClient
      .from("marketing_blog_posts")
      .insert({
        ...createData,
        json_content: jsonContent,
        seo_data: seoData,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    revalidatePath("/", "layout");
    return data;
  });

/**
 * Updates an existing marketing blog post.
 * Uses the admin action client to update a post in the database by its ID.
 * Revalidates the cache path to ensure the updated post is reflected in the UI.
 */
export const updateBlogPostAction = adminActionClient
  .schema(updateMarketingBlogPostActionSchema)
  .action(async ({ parsedInput }) => {
    const {
      id,
      stringified_json_content,
      stringified_seo_data,
      ...updateData
    } = parsedInput;

    const jsonContent = JSON.parse(stringified_json_content);
    const seoData = JSON.parse(stringified_seo_data);
    const { data, error } = await supabaseAdminClient
      .from("marketing_blog_posts")
      .update({
        ...updateData,
        json_content: jsonContent,
        seo_data: seoData,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);

    revalidatePath("/", "layout");
    return data;
  });

/**
 * Deletes a marketing blog post.
 * Removes a post from the database by its ID using the admin action client.
 * Revalidates the cache path to ensure the deletion is reflected in the UI.
 */
export const deleteBlogPostAction = adminActionClient
  .schema(deleteMarketingBlogPostSchema)
  .action(async ({ parsedInput: { id } }) => {
    const { error } = await supabaseAdminClient
      .from("marketing_blog_posts")
      .delete()
      .eq("id", id);

    if (error) throw new Error(error.message);

    revalidatePath("/", "layout");
    return { message: "Blog post deleted successfully" };
  });

/**
 * Updates authors for a blog post.
 * Deletes existing author relationships and inserts new ones for a given post.
 * Revalidates the cache path to ensure the author updates are reflected in the UI.
 */
export const updateBlogPostAuthorsAction = adminActionClient
  .schema(updateBlogPostAuthorsSchema)
  .action(async ({ parsedInput: { postId, authorIds } }) => {
    const { error: deleteError } = await supabaseAdminClient
      .from("marketing_blog_author_posts")
      .delete()
      .eq("post_id", postId);

    if (deleteError) throw new Error(deleteError.message);

    const authorRelations = authorIds.map((authorId) => ({
      post_id: postId,
      author_id: authorId,
    }));

    const { error: insertError } = await supabaseAdminClient
      .from("marketing_blog_author_posts")
      .insert(authorRelations);

    if (insertError) throw new Error(insertError.message);

    revalidatePath("/", "layout");
    return { message: "Blog post authors updated successfully" };
  });

/**
 * Updates tags for a blog post.
 * Deletes existing tag relationships and inserts new ones for a given post.
 * Revalidates the cache path to ensure the tag updates are reflected in the UI.
 */
export const updateBlogPostTagsAction = adminActionClient
  .schema(updateBlogPostTagsSchema)
  .action(async ({ parsedInput: { postId, tagIds } }) => {
    const { error: deleteError } = await supabaseAdminClient
      .from("marketing_blog_post_tags_relationship")
      .delete()
      .eq("blog_post_id", postId);

    if (deleteError) throw new Error(deleteError.message);

    const tagRelations = tagIds.map((tagId) => ({
      blog_post_id: postId,
      tag_id: tagId,
    }));

    const { error: insertError } = await supabaseAdminClient
      .from("marketing_blog_post_tags_relationship")
      .insert(tagRelations);

    if (insertError) throw new Error(insertError.message);

    revalidatePath("/", "layout");
    return { message: "Blog post tags updated successfully" };
  });

/**
 * Retrieves all marketing blog posts.
 * Fetches all posts from the database, including their authors and tags.
 * Orders the posts by creation date in descending order.
 */
export async function getAllBlogPosts() {
  const { data, error } = await supabaseAdminClient
    .from("marketing_blog_posts")
    .select(
      `
      *,
      marketing_blog_author_posts(author_id),
      marketing_blog_post_tags_relationship(tag_id)
    `,
    )
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
}

/**
 * Retrieves a single marketing blog post by ID.
 * Fetches a post from the database by its ID, including its authors and tags.
 */
export async function getBlogPostById(id: string) {
  const { data, error } = await supabaseAdminClient
    .from("marketing_blog_posts")
    .select(
      `
      *,
      marketing_blog_author_posts(author_id),
      marketing_blog_post_tags_relationship(tag_id)
    `,
    )
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

// Schema for form data containing a file, used in uploading blog cover images.
const formDataSchema = zfd.formData({
  file: zfd.file(),
});

// Schema for uploading a blog cover image, includes form data schema.
const uploadBlogCoverImageSchema = z.object({
  formData: formDataSchema,
});

/**
 * Uploads a blog cover image.
 * Generates a unique filename for the image and uploads it to the storage.
 * Returns the public URL of the uploaded image.
 */
export const uploadBlogCoverImageAction = adminActionClient
  .schema(uploadBlogCoverImageSchema)
  .action(async ({ parsedInput: { formData } }) => {
    const { file } = formData;

    const fileExtension = file.name.split(".").pop(); // Extracts the file extension
    const uniqueFilename = `${uuidv4()}.${fileExtension}`; // Generates a unique filename
    const blogImagesPath = `marketing/blog-images/${uniqueFilename}`;

    const { data, error } = await supabaseAdminClient.storage
      .from("marketing-assets")
      .upload(blogImagesPath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      throw new Error(error.message);
    }

    const { path } = data;

    const filePath = path.split(",")[0]; // Extracts the file path
    const supabaseFileUrl = urlJoin(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      "/storage/v1/object/public/marketing-assets",
      filePath,
    );

    return supabaseFileUrl;
  });
