import { getAnonUserFeedbackList } from "@/data/anon/marketing-feedback";
import { FeedbackList } from "./FeedbackList";
import type { FiltersSchema } from "./schema";

interface AnonFeedbackListProps {
  filters: FiltersSchema;
}

export async function AnonFeedbackList({ filters }: AnonFeedbackListProps) {
  const { data: feedbacks, count: totalFeedbackPages } =
    await getAnonUserFeedbackList(filters);

  return (
    <FeedbackList
      feedbacks={feedbacks}
      totalPages={totalFeedbackPages}
      filters={filters}
      userType="anon"
    />
  );
}
