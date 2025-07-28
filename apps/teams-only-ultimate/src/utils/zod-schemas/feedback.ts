import { Enum } from "@/types";
import { z } from "zod";

// We need to define the enum here so that we can use it in zod validation in
// server actions.
export const marketingFeedbackStatusEnum = z.enum([
  "open",
  "under_review",
  "planned",
  "closed",
  "in_progress",
  "completed",
  "moderator_hold",
]);

export type MarketingFeedbackStatusEnum = z.infer<
  typeof marketingFeedbackStatusEnum
>;
type DBMarketingFeedbackStatusEnum = Enum<"marketing_feedback_thread_status">;

// Check if MarketingFeedbackStatusEnum and DBMarketingFeedbackStatusEnum are equivalent
type StatusEnumEquivalence =
  MarketingFeedbackStatusEnum extends DBMarketingFeedbackStatusEnum
    ? DBMarketingFeedbackStatusEnum extends MarketingFeedbackStatusEnum
      ? true
      : false
    : false;

// This will cause a type error if the types are not equivalent
type AssertStatusEnumEquivalence = StatusEnumEquivalence extends true
  ? true
  : never;

// Usage: Don't remove this, it's used to ensure that the types are equivalent
const _assertStatusEnumEquivalence: AssertStatusEnumEquivalence = true;

export const marketingFeedbackTypeEnum = z.enum([
  "bug",
  "feature_request",
  "general",
]);
export type MarketingFeedbackTypeEnum = z.infer<
  typeof marketingFeedbackTypeEnum
>;
type DBMarketingFeedbackTypeEnum = Enum<"marketing_feedback_thread_type">;

// Check if MarketingFeedbackTypeEnum and DBMarketingFeedbackTypeEnum are equivalent
type TypeEnumEquivalence =
  MarketingFeedbackTypeEnum extends DBMarketingFeedbackTypeEnum
    ? DBMarketingFeedbackTypeEnum extends MarketingFeedbackTypeEnum
      ? true
      : false
    : false;

// This will cause a type error if the types are not equivalent
type AssertTypeEnumEquivalence = TypeEnumEquivalence extends true
  ? true
  : never;

// Usage: Don't remove this, it's used to ensure that the types are equivalent
const _assertTypeEnumEquivalence: AssertTypeEnumEquivalence = true;

export const marketingFeedbackThreadPriorityEnum = z.enum([
  "low",
  "medium",
  "high",
]);
export type MarketingFeedbackThreadPriorityEnum = z.infer<
  typeof marketingFeedbackThreadPriorityEnum
>;
type DBMarketingFeedbackThreadPriorityEnum =
  Enum<"marketing_feedback_thread_priority">;

// Check if MarketingFeedbackThreadPriorityEnum and DBMarketingFeedbackThreadPriorityEnum are equivalent
type PriorityEnumEquivalence =
  MarketingFeedbackThreadPriorityEnum extends DBMarketingFeedbackThreadPriorityEnum
    ? DBMarketingFeedbackThreadPriorityEnum extends MarketingFeedbackThreadPriorityEnum
      ? true
      : false
    : false;

// This will cause a type error if the types are not equivalent
type AssertPriorityEnumEquivalence = PriorityEnumEquivalence extends true
  ? true
  : never;

// Usage: Don't remove this, it's used to ensure that the types are equivalent
const _assertPriorityEnumEquivalence: AssertPriorityEnumEquivalence = true;

export const feedbackTypeToLabel = (type: MarketingFeedbackTypeEnum) => {
  switch (type) {
    case "bug":
      return "Bug Report";
    case "feature_request":
      return "Feature Request";
    case "general":
      return "General Feedback";
  }
};

export const feedbackPriorityToLabel = (
  priority: MarketingFeedbackThreadPriorityEnum,
) => {
  switch (priority) {
    case "low":
      return "Low";
    case "medium":
      return "Medium";
    case "high":
      return "High";
  }
};

export const feedbackStatusToLabel = (status: MarketingFeedbackStatusEnum) => {
  switch (status) {
    case "open":
      return "Open";
    case "under_review":
      return "Under Review";
    case "planned":
      return "Planned";
    case "closed":
      return "Closed";
    case "in_progress":
      return "In Progress";
    case "completed":
      return "Completed";
    case "moderator_hold":
      return "Moderator Hold";
  }
};
