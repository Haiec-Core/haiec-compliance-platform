import { PageHeading } from "@/components/PageHeading";
import { anonGetAllChangelogItems } from "@/data/anon/marketing-changelog";
import { Suspense } from "react";
import { ChangelogPosts } from "./AppAdminChangelog";
import { ChangelogListSkeletonFallBack } from "./_components/ChangelogSkeletonFallBack";

export default async function Page() {
  const changelogs = await anonGetAllChangelogItems();

  return (
    <div className="space-y-10 max-w-[1296px] py-8 select-none">
      <div className="flex w-full justify-between items-center">
        <PageHeading
          title="Changelog"
          titleClassName="text-2xl font-semibold tracking-normal"
          subTitle="Stay updated with the latest features and improvements."
        />
      </div>
      <Suspense fallback={<ChangelogListSkeletonFallBack />}>
        <ChangelogPosts changelogs={changelogs} />
      </Suspense>
    </div>
  );
}
