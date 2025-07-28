import { Link } from "@/components/intl-link";
import { serverGetUserType } from "@/utils/server/serverGetUserType";
import { userRoles } from "@/utils/userTypes";
import { ArrowLeftCircle } from "lucide-react";
import { Suspense } from "react";
import { FeedbackPageHeading } from "../FeedbackPageHeading";
import AdminUserFeedbackdetail from "./AdminUserFeedbackdetail";
import AnonUserFeedbackdetail from "./AnonUserFeedbackdetail";
import { FeedbackDetailSidebar } from "./FeedbackDetailSidebar";
import { FeedbackDetailFallback } from "./FeedbackPageFallbackUI";
import LoggedInUserFeedbackDetail from "./LoggedInUserFeedbackDetail";

async function FeedbackPage(props: {
  params: Promise<{ feedbackId: string }>;
}) {
  const params = await props.params;
  const userRoleType = await serverGetUserType();
  const feedbackId = params.feedbackId;

  return (
    <div className="h-full flex flex-col">
      <div className="flex gap-2 py-2 w-full items-start">
        <Link href="/feedback">
          <ArrowLeftCircle className="h-8 w-8" />
        </Link>
        <FeedbackPageHeading
          className="w-full"
          title={"Feedback"}
          subTitle=""
        />
      </div>
      <div className="md:flex grow gap-4">
        <div className="grow">
          <Suspense fallback={<FeedbackDetailFallback />}>
            {userRoleType === userRoles.ANON && (
              <AnonUserFeedbackdetail feedbackId={feedbackId} />
            )}
            {userRoleType === userRoles.USER && (
              <LoggedInUserFeedbackDetail feedbackId={feedbackId} />
            )}
            {userRoleType === userRoles.ADMIN && (
              <AdminUserFeedbackdetail feedbackId={feedbackId} />
            )}
          </Suspense>
        </div>
        <FeedbackDetailSidebar feedbackId={feedbackId} />
      </div>
    </div>
  );
}

export default FeedbackPage;
