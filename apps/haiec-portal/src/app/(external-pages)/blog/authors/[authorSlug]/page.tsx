import { T } from "@/components/ui/Typography";
import {
  anonGetBlogPostsByAuthorId,
  anonGetOneAuthorBySlug,
} from "@/data/anon/marketing-blog";
import moment from "moment";
import { notFound } from "next/navigation";
import { z } from "zod";
import AuthorCard from "../../AuthorCard";

const paramsSchema = z.object({
  authorSlug: z.string(),
});

export default async function AuthorPage(props: { params: Promise<unknown> }) {
  const params = await props.params;
  try {
    const { authorSlug } = paramsSchema.parse(params);
    const author = await anonGetOneAuthorBySlug(authorSlug);
    const blogs = await anonGetBlogPostsByAuthorId(author.id);
    const posts = blogs.map(({ marketing_blog_posts }) => marketing_blog_posts);
    const validPosts = posts.filter((post) => post !== null);
    return (
      <div className="space-y-8 w-full">
        <div className="flex items-center flex-col space-y-4">
          <T.H1>{author.display_name}&apos;s profile</T.H1>
          <AuthorCard author={author} trimSummary={false} />
        </div>
        <div className="flex items-center flex-col space-y-4">
          <div className="space-y-3 mb-6 text-center">
            <T.P className="text-xl leading-[30px] text-muted-foreground">
              Here is a collection of latest blog posts by {author.display_name}
            </T.P>
          </div>
        </div>
        <div className="flex gap-5 flex-col">
          <div className="space-y-2 mx-4 sm:mx-8 md:mx-0">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {validPosts.map((post) => (
                <article
                  key={post.id}
                  className="flex max-w-xl flex-col items-start justify-start"
                >
                  <div className="relative w-full">
                    <img
                      src={post.cover_image ?? "/images/nextbase-logo.png"}
                      alt={post.title}
                      className="aspect-16/9 w-full rounded-2xl bg-gray-100  object-cover sm:aspect-2/1 lg:aspect-3/2"
                    />
                  </div>
                  <div className="max-w-xl">
                    <div className="mt-5 flex items-center gap-x-4 text-xs">
                      <time
                        dateTime={post.created_at}
                        className="text-muted-foreground dark:text-secondary-foreground uppercase"
                      >
                        {moment(post.created_at).format("MMM D, YYYY")}
                      </time>
                    </div>
                    <div className="group relative">
                      <h3 className="mt-2 text-2xl font-semibold text-foreground dark:text-card-foreground group-hover:text-muted-foreground dark:group-hover:text-secondary-foreground">
                        <a href={`/blog/${post.slug}`}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </a>
                      </h3>
                      <p className="mt-2 line-clamp-3 text-base text-muted-foreground dark:text-muted-foreground">
                        {post.summary}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
    return null;
  }
}
