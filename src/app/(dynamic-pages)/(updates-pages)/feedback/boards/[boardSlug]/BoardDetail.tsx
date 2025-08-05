import { GiveFeedbackAnonUser } from "@/components/give-feedback-anon-use";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DBTable } from "@/types";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { FeedbackList } from "../../[feedbackId]/FeedbackList";
import { GiveFeedbackDialog } from "../../[feedbackId]/GiveFeedbackDialog";
import {
  FeedbackListSidebar,
  SidebarSkeleton,
} from "../../FeedbackListSidebar";
import { FeedbackPageHeading } from "../../FeedbackPageHeading";

interface BoardDetailProps {
  board: DBTable<"marketing_feedback_boards">;
  feedbacks: (DBTable<"marketing_feedback_threads"> & {
    comment_count: number;
    reaction_count: number;
  })[];
  totalPages: number;
  userType: "admin" | "loggedIn" | "anon";
}

export function BoardDetail({
  board,
  feedbacks,
  totalPages,
  userType,
}: BoardDetailProps) {
  const actions = (
    <DropdownMenuItem asChild>
      {userType === "anon" ? (
        <GiveFeedbackAnonUser>Create Feedback</GiveFeedbackAnonUser>
      ) : (
        <GiveFeedbackDialog>Create Feedback</GiveFeedbackDialog>
      )}
    </DropdownMenuItem>
  );

  return (
    <div className="space-y-6">
      <div className="flex gap-2  w-full items-start">
        <Link href="/feedback">
          <ArrowLeftCircle className="h-8 w-8" />
        </Link>
        <FeedbackPageHeading
          className="w-full"
          title={board.title}
          subTitle={board.description ?? "No description"}
          actions={actions}
        />
      </div>

      <div className="flex gap-4 w-full">
        <div className="flex-1">
          <FeedbackList
            feedbacks={feedbacks}
            totalPages={totalPages}
            filters={{}}
            userType={userType}
          />
        </div>
        <Suspense fallback={<SidebarSkeleton />}>
          <FeedbackListSidebar />
        </Suspense>
      </div>
    </div>
  );
}
