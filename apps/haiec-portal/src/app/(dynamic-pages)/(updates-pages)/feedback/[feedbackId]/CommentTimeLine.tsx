import { Skeleton } from "@/components/ui/skeleton";
import { appAdminGetInternalFeedbackComments } from "@/data/admin/marketing-feedback";
import { getInternalFeedbackComments } from "@/data/user/marketing-feedback";
import { serverGetUserType } from "@/utils/server/serverGetUserType";
import { userRoles } from "@/utils/userTypes";

import { SuspendedUserAvatarWithFullname } from "@/components/UserAvatarForAnonViewers";
import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Suspense } from "react";

function FeedbackCommentsFallback() {
  return (
    <ol className="relative border-l border-gray-200 dark:border-gray-700">
      <li className="mb-10 ms-4">
        <div className="absolute mt-1.5 -start-1.5 border">
          <div className="flex items-center space-x-4">
            <Skeleton className="w-6 h-6 rounded-full" />
            <Skeleton className="w-40 h-6 rounded-md" />
          </div>
        </div>
        <Skeleton className="mb-4 mt-2 h-10" />
      </li>
    </ol>
  );
}

export async function CommentTimeLineItem({
  userId,
  comment,
  postedAt,
  commentId,
}: {
  userId: string;
  comment: string;
  postedAt: string;
  commentId: string;
}) {
  return (
    <li
      data-testid={`comment-timeline-item-${commentId}`}
      data-comment-id={commentId}
    >
      <div className="flex space-x-2 items-center">
        <SuspendedUserAvatarWithFullname userId={userId} size={32} />
        <Separator orientation="vertical" className="h-4" />
        <time className="text-sm text-muted-foreground">
          {format(new Date(postedAt), "do MMMM yyyy")}
        </time>
      </div>
      <p className="ml-4 p-6 border-l-2 border-muted">{comment}</p>
    </li>
  );
}

export async function LoggedInUserFeedbackComments({
  feedbackId,
}: {
  feedbackId: string;
}) {
  const feedbackComments = await getInternalFeedbackComments(feedbackId);
  if (!feedbackComments.length) {
    return null;
  }

  return (
    <CardContent>
      <ol data-testid="logged-in-user-feedback-comments">
        {feedbackComments.map((comment) => (
          <CommentTimeLineItem
            key={comment.id}
            userId={comment.user_id}
            postedAt={comment.created_at}
            comment={comment.content}
            commentId={comment.id}
          />
        ))}
      </ol>
    </CardContent>
  );
}

export async function AnonUserFeedbackComments({
  feedbackId,
}: {
  feedbackId: string;
}) {
  const feedbackComments = await getInternalFeedbackComments(feedbackId);
  if (!feedbackComments.length) {
    return null;
  }
  return (
    <CardContent>
      <ol data-testid="anon-user-feedback-comments">
        {feedbackComments.map((comment) => (
          <CommentTimeLineItem
            key={comment.id}
            userId={comment.user_id}
            postedAt={comment.created_at}
            comment={comment.content}
            commentId={comment.id}
          />
        ))}
      </ol>
    </CardContent>
  );
}

export async function AdminFeedbackComments({
  feedbackId,
}: {
  feedbackId: string;
}) {
  const feedbackComments =
    await appAdminGetInternalFeedbackComments(feedbackId);
  if (!feedbackComments.length) {
    return null;
  }
  return (
    <CardContent>
      <ol data-testid="admin-user-feedback-comments">
        {feedbackComments.map((comment) => (
          <CommentTimeLineItem
            key={comment.id}
            userId={comment.user_id}
            postedAt={comment.created_at}
            comment={comment.content}
            commentId={comment.id}
          />
        ))}
      </ol>
    </CardContent>
  );
}

export async function SuspendedFeedbackComments({
  feedbackId,
}: {
  feedbackId: string;
}) {
  const userRoleType = await serverGetUserType();

  return (
    <Suspense fallback={<FeedbackCommentsFallback />}>
      {userRoleType == userRoles.ANON && (
        <AnonUserFeedbackComments feedbackId={feedbackId} />
      )}
      {userRoleType == userRoles.ADMIN && (
        <AdminFeedbackComments feedbackId={feedbackId} />
      )}
      {userRoleType == userRoles.USER && (
        <LoggedInUserFeedbackComments feedbackId={feedbackId} />
      )}
    </Suspense>
  );
}
