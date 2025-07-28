import { T } from "@/components/ui/Typography";
import { anonGetAllAuthors } from "@/data/anon/marketing-blog";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import AuthorCard from "../AuthorCard";

export default async function BlogPostPage() {
  const authors = await anonGetAllAuthors();
  try {
    return (
      <div className="space-y-8 w-full">
        <div className="flex items-center flex-col space-y-4">
          <div className="space-y-3 mb-6 text-center">
            <T.Subtle>Contributions</T.Subtle>
            <T.H1>Authors</T.H1>
            <T.P className="text-xl leading-[30px] text-muted-foreground">
              Our blog is made possible because of contributions from these
              awesome folks!
            </T.P>
          </div>
        </div>
        <div className="flex gap-5 flex-col">
          <Suspense fallback={<T.Subtle>Loading authors...</T.Subtle>}>
            {authors.map((author) => (
              <AuthorCard author={author} key={author.id} />
            ))}
          </Suspense>
        </div>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
