import { GiveFeedbackAnonUser } from "@/components/give-feedback-anon-use";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { serverGetUserType } from "@/utils/server/serverGetUserType";
import { userRoles } from "@/utils/userTypes";
import { Suspense } from "react";
import { CreateBoardDialog } from "./CreateBoardDialog";
import { FeedbackListSidebar, SidebarSkeleton } from "./FeedbackListSidebar";
import { FeedbackPageHeading } from "./FeedbackPageHeading";
import { AdminFeedbackList } from "./[feedbackId]/AdminFeedbackList";
import { AnonFeedbackList } from "./[feedbackId]/AnonFeedbackList";
import { GiveFeedbackDialog } from "./[feedbackId]/GiveFeedbackDialog";
import { LoggedInUserFeedbackList } from "./[feedbackId]/LoggedInUserFeedbackList";
import { filtersSchema } from "./[feedbackId]/schema";

async function FeedbackPage(props: {
  searchParams: Promise<unknown>;
  params: Promise<{ feedbackId: string }>;
}) {
  const searchParams = await props.searchParams;
  const validatedSearchParams = filtersSchema.parse(searchParams);
  const userRoleType = await serverGetUserType();
  const suspenseKey = JSON.stringify(validatedSearchParams);

  const actions = (
    <>
      <DropdownMenuItem asChild>
        {userRoleType === userRoles.ADMIN && (
          <CreateBoardDialog>Create Board</CreateBoardDialog>
        )}
      </DropdownMenuItem>

      {userRoleType === userRoles.ANON ? (
        <DropdownMenuItem asChild>
          <GiveFeedbackAnonUser>Create Feedback</GiveFeedbackAnonUser>
        </DropdownMenuItem>
      ) : (
        <DropdownMenuItem asChild>
          <GiveFeedbackDialog>Create Feedback</GiveFeedbackDialog>
        </DropdownMenuItem>
      )}
    </>
  );

  return (
    <div className="py-6 space-y-6">
      <FeedbackPageHeading
        title="Community Feedback"
        subTitle="Engage with the community and share your ideas."
        actions={actions}
      />

      <div className="md:flex gap-4 w-full">
        <div className="flex-1">
          <Suspense
            key={suspenseKey}
            fallback={
              <div className="flex items-center justify-center h-full">
                <div className="animate-pulse">Loading feedback...</div>
              </div>
            }
          >
            {userRoleType === userRoles.ANON && (
              <AnonFeedbackList filters={validatedSearchParams} />
            )}

            {userRoleType === userRoles.USER && (
              <LoggedInUserFeedbackList filters={validatedSearchParams} />
            )}

            {userRoleType === userRoles.ADMIN && (
              <AdminFeedbackList filters={validatedSearchParams} />
            )}
          </Suspense>
        </div>
        <Suspense fallback={<SidebarSkeleton />}>
          <FeedbackListSidebar />
        </Suspense>
      </div>
    </div>
  );
}

export default FeedbackPage;
