import { PageHeading } from "@/components/PageHeading";
import { T } from "@/components/ui/Typography";
import { Skeleton } from "@/components/ui/skeleton";
import { getActiveDeveloperKeyCount } from "@/data/user/unkey";
import { Suspense } from "react";
import { ActiveApiKeyList } from "./ActiveApiKeyList";
import { GenerateApiKey } from "./GenerateApiKey";
import { RevokedApiKeyList } from "./RevokedApiKeyList";

export default async function DeveloperSettings() {
  const activeDeveloperKeyCount = await getActiveDeveloperKeyCount();
  return (
    <div className="space-y-8">
      <PageHeading
        title="Developer Settings"
        titleClassName="text-xl"
        subTitleClassName="text-base -mt-1"
        subTitle="Manage your developer settings here."
      />
      <div className="space-y-2">
        <Suspense fallback={<Skeleton className="w-16 h-6" />}>
          <ActiveApiKeyList />
        </Suspense>
        {activeDeveloperKeyCount < 3 ? (
          <GenerateApiKey key={activeDeveloperKeyCount} />
        ) : (
          <T.Subtle>You have reached API Key Limit.</T.Subtle>
        )}
      </div>
      <Suspense fallback={<Skeleton className="w-16 h-6" />}>
        <RevokedApiKeyList />
      </Suspense>
    </div>
  );
}
