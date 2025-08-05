import { Pagination } from "@/components/Pagination";
import { Link } from "@/components/intl-link";
import { T } from "@/components/ui/Typography";
import { Badge } from "@/components/ui/badge";
import { DBTable } from "@/types";
import { NEW_STATUS_OPTIONS } from "@/utils/feedback";
import {
  Bug,
  LucideCloudLightning,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";
import { Suspense } from "react";
import { FeedbackAvatarServer } from "./FeedbackAvatarServer";
import type { FiltersSchema } from "./schema";

const typeIcons = {
  bug: <Bug className="h-3 w-3 mr-1 text-destructive" />,
  feature_request: (
    <LucideCloudLightning className="h-3 w-3 mr-1 text-primary" />
  ),
  general: <MessageSquare className="h-3 w-3 mr-1 text-secondary" />,
};

const TAGS = {
  bug: "Bug",
  feature_request: "Feature Request",
  general: "General",
};

interface FeedbackItemProps {
  feedback: DBTable<"marketing_feedback_threads"> & {
    comment_count: number;
    reaction_count: number;
  };
  filters: FiltersSchema;
}

function FeedbackItem({ feedback, filters }: FeedbackItemProps) {
  const searchParams = new URLSearchParams();
  if (filters.page) searchParams.append("page", filters.page.toString());
  const href = `/feedback/${feedback.id}?${searchParams.toString()}`;

  const statusOption = NEW_STATUS_OPTIONS.find(
    (option) => option.value === feedback.status,
  );

  return (
    <Link href={href}>
      <div className="transition-colors duration-200 px-4 py-3 rounded">
        <div className="space-y-2">
          <T.H4 className="font-semibold line-clamp-1 text-base pt-0 mt-0">
            {feedback.title}
          </T.H4>

          <T.Small className="text-muted-foreground line-clamp-2 block">
            {feedback.content}
          </T.Small>

          <div className="flex items-center justify-between pt-2">
            <FeedbackAvatarServer feedback={feedback} />

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                {statusOption && (
                  <Badge
                    variant="secondary"
                    className="rounded-full text-[0.7rem] py-0 px-1.5 h-5 flex items-center gap-1"
                  >
                    <statusOption.icon className="h-2.5 w-2.5" />
                    {statusOption.label}
                  </Badge>
                )}
                <Badge
                  variant="secondary"
                  className="rounded-full text-[0.7rem] py-0 px-1.5 h-5 flex items-center gap-1"
                >
                  {typeIcons[feedback.type]} {TAGS[feedback.type]}
                </Badge>
              </div>

              <div className="flex items-center gap-2 border-l pl-2">
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground text-xs">
                    {feedback.comment_count}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground text-xs">
                    {feedback.reaction_count}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

interface FeedbackListProps {
  feedbacks: Array<
    DBTable<"marketing_feedback_threads"> & {
      comment_count: number;
      reaction_count: number;
    }
  >;
  totalPages: number;
  filters: FiltersSchema;
  userType: "admin" | "loggedIn" | "anon";
}

function FeedbackListContent({
  feedbacks,
  totalPages,
  filters,
  userType,
}: FeedbackListProps) {
  const emptyStateMessages = {
    admin: "You must be logged in to view feedback.",
    loggedIn: "You haven't submitted any feedback yet.",
    anon: "No public feedbacks found.",
  };

  return (
    <div className="flex flex-col border rounded-lg bg-card space-y-3">
      <div className="flex-1 overflow-auto divide-y divide-y-1 flex flex-col">
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <FeedbackItem
              key={feedback.id}
              feedback={feedback}
              filters={filters}
            />
          ))
        ) : (
          <div className="flex h-full w-full items-center justify-center p-6">
            <div className="flex flex-col items-center gap-1.5 text-center">
              <h3 className="font-semibold text-sm">No Feedbacks Available</h3>
              <p className="text-xs text-muted-foreground">
                {emptyStateMessages[userType]}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="px-3">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

export function FeedbackList(props: FeedbackListProps) {
  return (
    <Suspense fallback={<div>Loading feedback list...</div>}>
      <FeedbackListContent {...props} />
    </Suspense>
  );
}
