import { T } from "@/components/ui/Typography";
import {
  anonGetAllBlogTags,
  anonGetPublishedBlogPosts,
} from "@/data/anon/marketing-blog";
import { Suspense } from "react";
import { PublicBlogList } from "../PublicBlogList";
import { TagsNav } from "../TagsNav";

export const metadata = {
  title: "Blog List | Nextbase",
  description: "Collection of the latest blog posts from the team at Nextbase",
  icons: {
    icon: "/images/logo-black-main.ico",
  },
};

async function Tags() {
  const tags = await anonGetAllBlogTags();
  return <TagsNav tags={tags} />;
}

async function BlogList() {
  const blogPosts = await anonGetPublishedBlogPosts();
  return <PublicBlogList blogPosts={blogPosts} />;
}

export default async function BlogListPage() {
  return (
    <div className="space-y-8 w-full">
      <div className="flex items-center flex-col space-y-4">
        <div className="space-y-2 text-center">
          <T.Subtle>Blog</T.Subtle>
          <T.H1>All blog posts</T.H1>
          <T.P className="text-xl leading-[30px] text-muted-foreground">
            Here is a collection of the latest blog posts from the team at
            Nextbase.
          </T.P>
        </div>
        <Suspense fallback={<T.Subtle>Loading tags...</T.Subtle>}>
          <Tags />
        </Suspense>
      </div>
      <Suspense fallback={<T.Subtle>Loading posts...</T.Subtle>}>
        <BlogList />
      </Suspense>
    </div>
  );
}
