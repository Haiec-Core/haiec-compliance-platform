// @/app/(dynamic-pages)/(authenticated-pages)/app_admin/(admin-pages)/marketing/blog/[postId]/page.tsx
import { getAllAuthorProfiles } from "@/data/admin/marketing-authors";
import { getBlogPostById } from "@/data/admin/marketing-blog";
import { getAllTags } from "@/data/admin/marketing-tags";
import { notFound } from "next/navigation";
import { EditBlogPostLayout } from "./EditBlogPostLayout";

export default async function EditBlogPostPage(props: {
  params: Promise<{ postId: string }>;
}) {
  const params = await props.params;
  const post = await getBlogPostById(params.postId);

  if (!post) {
    notFound();
  }

  const authors = await getAllAuthorProfiles();
  const tags = await getAllTags();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Blog Post</h1>
      <EditBlogPostLayout post={post} authors={authors} tags={tags} />
    </div>
  );
}
