// @/app/(dynamic-pages)/(authenticated-pages)/app_admin/(admin-pages)/marketing/blog/[postId]/EditBlogPostLayout.tsx
import { DBTable } from "@/types";
import React from "react";
import { AuthorsSelect } from "./AuthorsSelect";
import { EditBlogPostForm } from "./EditBlogPostForm";
import { TagsSelect } from "./TagsSelect";

type EditBlogPostLayoutProps = {
  post: DBTable<"marketing_blog_posts">;
  authors: DBTable<"marketing_author_profiles">[];
  tags: DBTable<"marketing_tags">[];
};

export const EditBlogPostLayout: React.FC<EditBlogPostLayoutProps> = ({
  post,
  authors,
  tags,
}) => {
  return (
    <div className="flex gap-6">
      <div className="grow">
        <EditBlogPostForm post={post} />
      </div>
      <div className="w-1/3 space-y-6 shrink-0">
        <AuthorsSelect post={post} authors={authors} />
        <TagsSelect post={post} tags={tags} />
      </div>
    </div>
  );
};
