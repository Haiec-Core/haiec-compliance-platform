import { Link } from "@/components/intl-link";
import { T } from "@/components/ui/Typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { anonGetMarketingAuthorById } from "@/data/anon/marketing-authors";
import { DBTable } from "@/types";
import { CalendarDays } from "lucide-react";
import moment from "moment";
import { Fragment } from "react";
import { AuthorProfileImage } from "./AuthorProfileImage";
import { BlogPostImage } from "./BlogPostImage";

function AuthorProfileSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="w-8 h-8 rounded-full" />
      <Skeleton className="h-4 w-24" />
    </div>
  );
}

async function AuthorProfile({ authorId }: { authorId: string }) {
  if (!authorId) return null;

  const author = await anonGetMarketingAuthorById(authorId);

  return (
    <div className="flex items-center text-sm text-muted-foreground">
      <AuthorProfileImage
        avatarUrl={author.avatar_url}
        name={author.display_name}
      />
      <div className="relative ml-2 h-4">
        <div className="absolute inset-0 bg-gray-100 animate-pulse rounded" />
        <span>{author.display_name}</span>
      </div>
    </div>
  );
}

export function PublicBlogList({
  blogPosts,
}: {
  blogPosts: Array<
    DBTable<"marketing_blog_posts"> & {
      marketing_blog_author_posts: Array<
        DBTable<"marketing_blog_author_posts">
      >;
    }
  >;
}) {
  return (
    <Fragment>
      {blogPosts.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
          {blogPosts.map((post) => {
            const authorId = post.marketing_blog_author_posts[0]?.author_id;
            return (
              <Link
                href={`/blog/${post.slug}`}
                key={post.id}
                className="hover:opacity-80 transition-opacity"
              >
                <Card className="h-full">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <BlogPostImage
                      src={post.cover_image ?? "/images/nextbase-logo.png"}
                      alt={post.title}
                    />
                  </div>
                  <CardHeader className="space-y-2">
                    <CardTitle className="text-lg font-medium line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {post.summary}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarDays className="w-4 h-4 mr-2" />
                      <span>
                        {moment(post.created_at).format("MMM D, YYYY")}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <T.Subtle className="text-center">No blog posts yet.</T.Subtle>
      )}
    </Fragment>
  );
}
