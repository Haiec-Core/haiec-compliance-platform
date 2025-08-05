import { T } from "@/components/ui/Typography";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getAnonUserFeedbackById } from "@/data/anon/marketing-feedback";
import { EyeIcon, Info } from "lucide-react";
import { notFound } from "next/navigation";
import { SuspendedFeedbackComments } from "./CommentTimeLine";

async function AnonUserFeedbackDetail({ feedbackId }: { feedbackId: string }) {
  const feedback = await getAnonUserFeedbackById(feedbackId);

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
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <SuspendedFeedbackComments feedbackId={feedback?.id} />
        </CardContent>
      </Card>
    </div>
  );
}

export default AnonUserFeedbackDetail;
