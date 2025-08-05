import { Link } from "@/components/intl-link";
import { Button } from "@/components/ui/button";
import type { Enum } from "@/types";
import { formatFieldValue } from "@/utils/feedback";
import { Bug, Calendar, Command, EyeIcon, Info, Pencil } from "lucide-react";
import type { HtmlHTMLAttributes } from "react";
import { Badge, type BadgeProps } from "./ui/badge";

type InternalRoadmapCardProps = {
  title: string;
  description: string;
  tag: Enum<"marketing_feedback_thread_type">;
  date: string;
  priority: Enum<"marketing_feedback_thread_priority">;
  feedbackItemId: string;
  isAdmin?: boolean;
};

const getIconVariantForTag = (tag: Enum<"marketing_feedback_thread_type">) => {
  switch (tag) {
    case "bug":
      return <Bug className="mr-2 h-4 w-4" />;
    case "general":
      return <Info className="mr-2 h-4 w-4" />;
    case "feature_request":
      return <Command className="mr-2 h-4 w-4" />;
    default:
      return null;
  }
};

const getPriorityVariant = (
  priority: Enum<"marketing_feedback_thread_priority">,
): BadgeProps["variant"] => {
  switch (priority) {
    case "high":
      return "destructive";
    case "medium":
      return "default";
    case "low":
      return "outline";
    default:
      return "default";
  }
};

export default function InternalRoadmapCard({
  title,
  description,
  tag,
  date,
  priority,
  feedbackItemId,
  isAdmin,
  ...rest
}: InternalRoadmapCardProps & HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className="grid border grid-cols-[1fr_auto] gap-1 items-start rounded-xl bg-white dark:bg-slate-900 p-4"
    >
      <div className="space-y-4">
        <div className="space-y-1">
          <p className="text-lg font-semibold  ">{title}</p>
          <p className="text-base text-muted-foreground">{description}</p>
        </div>

        <div className="mt-3 -mb-0.5">
          <div className="flex space-x-2 mb-3">
            <Badge variant="outline">
              {getIconVariantForTag(tag)}
              {formatFieldValue(tag)}
            </Badge>
            <Badge variant={"outline"}>{formatFieldValue(priority)}</Badge>
          </div>

          <div className="flex text-sm text-muted-foreground items-center">
            <Calendar className="mr-2 h-4 w-4" />
            <span className="font-semibold">{date}</span>
          </div>
        </div>
      </div>

      <Link href={`/feedback/${feedbackItemId}`} className="mt-1">
        <Button variant={"ghost"} size="icon">
          {isAdmin ? (
            <Pencil className="h-4 w-4" />
          ) : (
            <EyeIcon className="h-4 w-4" />
          )}
        </Button>
      </Link>
    </div>
  );
}
