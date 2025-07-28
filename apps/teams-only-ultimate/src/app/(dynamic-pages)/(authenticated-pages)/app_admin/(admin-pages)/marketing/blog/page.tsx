// src/app/(dynamic-pages)/(authenticated-pages)/app_admin/(admin-pages)/marketing/blog/page.tsx
import { Typography } from "@/components/ui/Typography";
import { getAllBlogPosts } from "@/data/admin/marketing-blog";
import { BlogList } from "./BlogList";

export default async function MarketingBlogPage() {
  const posts = await getAllBlogPosts();
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Typography.H1 className="text-3xl font-bold tracking-tight">
          Marketing Blog Posts
        </Typography.H1>
        <Typography.P className="text-muted-foreground">
          Manage and view all marketing blog posts.
        </Typography.P>
      </div>
      <BlogList posts={posts} />
    </div>
  );
}
