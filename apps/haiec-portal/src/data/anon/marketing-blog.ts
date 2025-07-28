"use server";
import { supabaseAnonClient } from "@/supabase-clients/anon/supabaseAnonClient";
import type { AppSupabaseClient } from "@/types";

export const anonGetBlogPostById = async (postId: string) => {
  const { data, error } = await supabaseAnonClient
    .from("marketing_blog_posts")
    .select(
      "*, marketing_blog_author_posts(*, marketing_blog_author_profiles(*))",
    )
    .eq("id", postId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const anonGetBlogPostBySlug = async (slug: string) => {
  const { data, error } = await supabaseAnonClient
    .from("marketing_blog_posts")
    .select("*, marketing_blog_author_posts(*, marketing_author_profiles(*))")
    .eq("slug", slug)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const anonGetPublishedBlogPostBySlug = async (slug: string) => {
  const { data, error } = await supabaseAnonClient
    .from("marketing_blog_posts")
    .select(
      "*, marketing_blog_author_posts(*, marketing_author_profiles(*)), marketing_blog_post_tags_relationship(*, marketing_tags(*))",
    )
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const anonGetPublishedBlogPosts = async () => {
  const { data, error } = await supabaseAnonClient
    .from("marketing_blog_posts")
    .select("*, marketing_blog_author_posts(*, marketing_author_profiles(*))")
    .eq("status", "published");

  if (error) {
    throw error;
  }

  return data;
};

export const anonGetPublishedBlogPostsByTagSlug = async (tagSlug: string) => {
  const { data: tag, error: tagError } = await supabaseAnonClient
    .from("marketing_tags")
    .select("*")
    .eq("slug", tagSlug)
    .single();

  if (tagError) {
    throw tagError;
  }

  const {
    data: blogPostTagRelationships,
    error: blogPostTagRelationshipsError,
  } = await supabaseAnonClient
    .from("marketing_blog_post_tags_relationship")
    .select("*")
    .eq("tag_id", tag.id);

  if (blogPostTagRelationshipsError) {
    throw blogPostTagRelationshipsError;
  }

  const postIds = blogPostTagRelationships.map(
    (relationship) => relationship.blog_post_id,
  );

  const { data, error } = await supabaseAnonClient
    .from("marketing_blog_posts")
    .select("*, marketing_blog_author_posts(*, marketing_author_profiles(*))")
    .in("id", postIds)
    .eq("status", "published");

  if (error) {
    throw error;
  }

  return data;
};

export const anonGetBlogPostsByAuthorId = async (authorId: string) => {
  const { data, error } = await supabaseAnonClient
    .from("marketing_blog_author_posts")
    .select("*, marketing_blog_posts(*)")
    .eq("author_id", authorId);

  if (error) {
    throw error;
  }

  return data;
};

export const anonGetAllBlogPosts = async (
  supabaseClient: AppSupabaseClient,
) => {
  const { data, error } = await supabaseAnonClient
    .from("marketing_blog_posts")
    .select("*");

  if (error) {
    throw error;
  }

  return data;
};

export const anonGetAllAuthors = async () => {
  const { data, error } = await supabaseAnonClient
    .from("marketing_author_profiles")
    .select("*");

  if (error) {
    throw error;
  }

  return data;
};

export const anonGetOneAuthor = async (userId: string) => {
  const { data, error } = await supabaseAnonClient
    .from("marketing_author_profiles")
    .select("*")
    .eq("id", userId);

  if (error) {
    throw error;
  }

  return data;
};

export const anonGetOneAuthorBySlug = async (slug: string) => {
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

export const anonGetTagBySlug = async (slug: string) => {
  const { data, error } = await supabaseAnonClient
    .from("marketing_tags")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const anonGetAllBlogTags = async () => {
  const { data, error } = await supabaseAnonClient
    .from("marketing_tags")
    .select("*");

  if (error) {
    throw error;
  }

  return data;
};
