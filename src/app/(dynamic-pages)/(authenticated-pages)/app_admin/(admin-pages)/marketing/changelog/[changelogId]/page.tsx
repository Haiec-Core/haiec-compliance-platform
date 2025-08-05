import { getAllAuthorProfiles } from "@/data/admin/marketing-authors";
import { getChangelogById } from "@/data/admin/marketing-changelog";
import { notFound } from "next/navigation";
import { z } from "zod";
import { EditChangelogForm } from "./EditChangelogForm";

const editChangelogPageSchema = z.object({
  changelogId: z.string().uuid(),
});

export default async function EditChangelogPage(props: {
  params: Promise<unknown>;
}) {
  const params = await props.params;
  const { changelogId } = editChangelogPageSchema.parse(params);
  const changelog = await getChangelogById(changelogId);
  const authors = await getAllAuthorProfiles();

  if (!changelog) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Changelog</h1>
      <EditChangelogForm changelog={changelog} authors={authors} />
    </div>
  );
}
