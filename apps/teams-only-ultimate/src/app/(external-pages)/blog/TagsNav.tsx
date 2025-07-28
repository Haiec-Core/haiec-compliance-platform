import { Link } from "@/components/intl-link";
import { Button } from "@/components/ui/button";
import { DBTable } from "@/types";

export function TagsNav({ tags }: { tags: DBTable<"marketing_tags">[] }) {
  return (
    <div className="space-x-2 flex px-4 sm:px-0 flex-wrap justify-center">
      <Link href="/blog">
        <Button variant="outline" className="mr-2 mb-2">
          All
        </Button>
      </Link>

      {tags.map((tag) => (
        <Link href={`/blog/tag/${tag.slug}`} key={tag.id}>
          <Button variant="outline" className="mr-2 mb-2">
            {tag.name}
          </Button>
        </Link>
      ))}
    </div>
  );
}
