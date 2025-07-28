import type { BadgeProps } from "@/components/ui/badge";
import type { Enum } from "@/types";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CalendarIcon,
  CheckCircledIcon,
  LightningBoltIcon,
  QuestionMarkCircledIcon,
  ReaderIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import { Bug, MessageSquareDotIcon, XCircle } from "lucide-react";

export const formatFieldValue = (type: string) => {
  // feature_request to Feature request
  return type.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

export const STATUS_OPTIONS: Array<Enum<"marketing_feedback_thread_status">> = [
  "open",
  "in_progress",
  "closed",
  "planned",
  "under_review",
];

export const NEW_STATUS_OPTIONS: Array<{
  value: Enum<"marketing_feedback_thread_status">;
  label: string;
  icon: React.ElementType;
}> = [
  {
    label: "Open",
    value: "open",
    icon: QuestionMarkCircledIcon,
  },
  {
    label: "In Progress",
    value: "in_progress",
    icon: StopwatchIcon,
  },
  {
    label: "Closed",
    value: "closed",
    icon: XCircle,
  },
  {
    label: "Planned",
    value: "planned",
    icon: CalendarIcon,
  },
  {
    label: "Under Review",
    value: "under_review",
    icon: ReaderIcon,
  },
  {
    label: "Completed",
    value: "completed",
    icon: CheckCircledIcon,
  },
];

export const NEW_PRIORITY_OPTIONS: Array<{
  value: Enum<"marketing_feedback_thread_priority">;
  label: string;
  icon: React.ElementType;
}> = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];

export const NEW_TYPE_OPTIONS: Array<{
  value: Enum<"marketing_feedback_thread_type">;
  label: string;
  icon: React.ElementType;
}> = [
  {
    label: "Bug",
    value: "bug",
    icon: Bug,
  },
  {
    label: "Feature Request",
    value: "feature_request",
    icon: LightningBoltIcon,
  },
  {
    label: "General",
    value: "general",
    icon: MessageSquareDotIcon,
  },
];

export const PRIORITY_OPTIONS: Array<
  Enum<"marketing_feedback_thread_priority">
> = ["low", "medium", "high"];

export const TYPE_OPTIONS: Array<Enum<"marketing_feedback_thread_type">> = [
  "bug",
  "feature_request",
  "general",
];

export const mapStatusToVariant = (
  status: Enum<"marketing_feedback_thread_status">,
): BadgeProps["variant"] => {
  switch (status) {
    case "closed":
      return "outline";
    case "open":
    case "in_progress":
      return "default";
    case "planned":
    case "under_review":
      return "secondary";
    default:
      return "default";
  }
};

export const mapTypeToVariant = (
  type: Enum<"marketing_feedback_thread_type">,
): BadgeProps["variant"] => {
  switch (type) {
    case "bug":
      return "destructive";
    case "feature_request":
      return "secondary";
    case "general":
      return "default";
    default:
      return "default";
  }
};

export const mapPriorityToVariant = (
  priority: Enum<"marketing_feedback_thread_priority">,
): BadgeProps["variant"] => {
  switch (priority) {
    case "low":
      return "outline";
    case "medium":
      return "default";
    case "high":
      return "destructive";
    default:
      return "default";
  }
};
