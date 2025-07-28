import { getLoggedInUserFeedbackList } from "@/data/user/marketing-feedback";
import { FeedbackList } from "./FeedbackList";
import type { FiltersSchema } from "./schema";

interface LoggedInUserFeedbackListProps {
  filters: FiltersSchema;
}

export async function LoggedInUserFeedbackList({
  filters,
}: LoggedInUserFeedbackListProps) {
  const { data: feedbacks, count: totalFeedbackPages } =
    await getLoggedInUserFeedbackList(filters);

  return (
    <FeedbackList
      feedbacks={feedbacks}
      totalPages={totalFeedbackPages ?? 0}
      filters={filters}
      userType="loggedIn"
    />
  );
}
