import { Database } from "@/lib/database.types";
import { z } from "zod";

type MarketingFeedbackThreadStatus =
  Database["public"]["Enums"]["marketing_feedback_thread_status"];
type MarketingFeedbackThreadType =
  Database["public"]["Enums"]["marketing_feedback_thread_type"];
type MarketingFeedbackThreadPriority =
  Database["public"]["Enums"]["marketing_feedback_thread_priority"];

const singleOrArray = <T extends z.ZodType>(schema: T) => {
  return z.preprocess((obj) => {
    if (Array.isArray(obj)) {
      return obj;
    }

    if (typeof obj === "string") {
      return obj.split(",");
    }
    return [];
  }, z.array(schema));
};

export const feedbackStatusesSchema = singleOrArray(
  z.enum([
    "open",
    "in_progress",
    "closed",
    "planned",
    "under_review",
    "completed",
  ] as [MarketingFeedbackThreadStatus, ...MarketingFeedbackThreadStatus[]]),
);

export const feedbackTypesSchema = singleOrArray(
  z.enum(["bug", "feature_request", "general"] as [
    MarketingFeedbackThreadType,
    ...MarketingFeedbackThreadType[],
  ]),
);

export const feedbackPrioritiesSchema = singleOrArray(
  z.enum(["low", "medium", "high"] as [
    MarketingFeedbackThreadPriority,
    ...MarketingFeedbackThreadPriority[],
  ]),
);

export const dropdownFiltersSchema = z.object({
  statuses: feedbackStatusesSchema.optional(),
  types: feedbackTypesSchema.optional(),
  priorities: feedbackPrioritiesSchema.optional(),
});

export type FeedbackDropdownFiltersSchema = z.infer<
  typeof dropdownFiltersSchema
> & {
  myFeedbacks: boolean;
};

export const filtersSchema = z
  .object({
    page: z.coerce.number().int().positive().optional(),
    query: z.string().optional(),
  })
  .merge(dropdownFiltersSchema)
  .merge(z.object({ myFeedbacks: z.string().optional() }))
  .passthrough();

export type FiltersSchema = z.infer<typeof filtersSchema>;

export const sortSchema = z.object({
  sort: z.enum(["recent"]).optional(),
});

export type FeedbackSortSchema = z.infer<typeof sortSchema>;
