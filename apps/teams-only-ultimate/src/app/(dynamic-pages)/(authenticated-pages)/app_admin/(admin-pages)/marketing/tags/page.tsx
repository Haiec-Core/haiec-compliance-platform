import { Typography } from "@/components/ui/Typography";
import { getAllTags } from "@/data/admin/marketing-tags";
import { CreateTagButton } from "./CreateTagButton";
import { TagsList } from "./TagsList";

export default async function MarketingTagsPage() {
  const tags = await getAllTags();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Typography.H1 className="text-3xl font-bold tracking-tight">
          Marketing Tags
        </Typography.H1>
        <CreateTagButton />
      </div>
      <Typography.P className="text-muted-foreground">
        Manage and view all marketing tags.
      </Typography.P>
      <TagsList tags={tags} />
    </div>
  );
}
