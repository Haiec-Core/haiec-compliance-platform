import { PageHeading } from "@/components/PageHeading";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { PendingInvitationsList } from "./PendingInvitationsList";

export default async function DashboardPage() {
  return (
    <div className="space-y-4">
      <PageHeading
        title="Pending Invitations"
        subTitle="Manage pending invitations here."
      />
      <Suspense fallback={<Skeleton className="w-16 h-6" />}>
        <PendingInvitationsList />
      </Suspense>
    </div>
  );
}
