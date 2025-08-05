import { T, Typography } from "@/components/ui/Typography";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getLoggedInUserFeedbackById } from "@/data/user/marketing-feedback";
import { serverGetLoggedInUserVerified } from "@/utils/server/serverGetLoggedInUser";
import { serverGetUserType } from "@/utils/server/serverGetUserType";
import { EyeIcon, EyeOffIcon, Info } from "lucide-react";
import { notFound } from "next/navigation";
import { AddComment } from "./AddComment";
import { SuspendedFeedbackComments } from "./CommentTimeLine";
import { FeedbackActionsDropdown } from "./FeedbackActionsDropdown";

async function LoggedInUserFeedbackDetail({
  feedbackId,
}: {
  feedbackId: string;
}) {
  const userRoleType = await serverGetUserType();
  const user = await serverGetLoggedInUserVerified();
  const feedback = await getLoggedInUserFeedbackById(feedbackId);

  if (!feedback) {
    return notFound();
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <div className="flex flex-col gap-2 flex-1">
            <h2 className="text-2xl font-medium">{feedback.title}</h2>
            <T.Subtle>{feedback.content}</T.Subtle>
          </div>
          <div
            data-testid="feedback-visibility"
            className="flex items-center gap-2"
          >
            {feedback.is_publicly_visible ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge
                      variant="outline"
                      className="px-2 rounded-full flex gap-2 items-center border-green-300 text-green-500"
                    >
                      <EyeIcon className="w-4 h-4" /> <span>Public</span>{" "}
                      <Info className="w-4 h-4" />
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    This feedback is visible to the public
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge
                      variant="outline"
                      className="px-2 rounded-full flex gap-2 items-center"
                    >
                      <EyeOffIcon className="w-4 h-4" /> <span>Private</span>{" "}
                      <Info className="w-4 h-4" />
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    This feedback is only visible to admins and the user who
                    created it.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <FeedbackActionsDropdown
              feedback={feedback}
              userRole={userRoleType}
            />
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <Typography.H4 className="mt-0!">Comments</Typography.H4>
        </CardHeader>
        <CardContent>
          <SuspendedFeedbackComments feedbackId={feedback?.id} />
        </CardContent>
        {(feedback.open_for_public_discussion ||
          feedback.user_id === user.id) && (
            <CardFooter>
              <AddComment feedbackId={feedback?.id} />
            </CardFooter>
          )}
      </Card>
    </div>
  );
}

export default LoggedInUserFeedbackDetail;
