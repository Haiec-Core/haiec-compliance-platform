import { Typography } from "@/components/ui/Typography";
import { getAllChangelogs } from "@/data/admin/marketing-changelog";
import { ChangelogList } from "./ChangelogList";
import { CreateChangelogButton } from "./CreateChangelogButton";

export default async function MarketingChangelogPage() {
  const changelogs = await getAllChangelogs();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Typography.H1 className="text-3xl font-bold tracking-tight">
          Marketing Changelogs
        </Typography.H1>
        <CreateChangelogButton />
      </div>
      <Typography.P className="text-muted-foreground">
        Manage and view all marketing changelogs.
      </Typography.P>
      <ChangelogList changelogs={changelogs} />
    </div>
  );
}
