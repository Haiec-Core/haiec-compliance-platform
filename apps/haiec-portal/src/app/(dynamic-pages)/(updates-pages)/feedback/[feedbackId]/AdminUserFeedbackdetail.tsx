import { T } from "@/components/ui/Typography";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { adminGetInternalFeedbackById } from "@/data/admin/marketing-feedback";
import { serverGetUserType } from "@/utils/server/serverGetUserType";
import { EyeIcon, EyeOffIcon, Info } from "lucide-react";
import { AddComment } from "./AddComment";
import { SuspendedFeedbackComments } from "./CommentTimeLine";
import { FeedbackActionsDropdown } from "./FeedbackActionsDropdown";

async function AdminUserFeedbackdetail({ feedbackId }: { feedbackId: string }) {
  const userRoleType = await serverGetUserType();
  const feedback = await adminGetInternalFeedbackById(feedbackId);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex-row items-start justify-between space-y-0">
          <div className="flex flex-col gap-2 flex-1">
            <h2 className="text-2xl font-medium">{feedback?.title}</h2>
            <T.Subtle>{feedback?.content}</T.Subtle>
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
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <SuspendedFeedbackComments feedbackId={feedback?.id} />
        <CardFooter>
          <AddComment feedbackId={feedback?.id} />
        </CardFooter>
      </Card>
    </div>
  );
}

export default AdminUserFeedbackdetail;
