import { Link } from "@/components/intl-link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getFeedbackBoardColorClass } from "@/constants";
import {
  getFeedbackBoardsWithCounts,
  getTotalFeedbackCount,
} from "@/data/admin/marketing-feedback";
import { cn } from "@/utils/cn";
import { NotepadText } from "lucide-react";
import { FeedbackFilterDialog } from "./components/FeedbackFilterDialog";

export function SidebarSkeleton() {
  return (
    <div className="w-64 shrink-0 p-4">
      <Skeleton className="h-10 w-full mb-6" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-20" />
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

export async function FeedbackListSidebar() {
  const boards = await getFeedbackBoardsWithCounts();
  const totalCount = await getTotalFeedbackCount();

  return (
    <div className="w-64 shrink-0 space-y-4 hidden md:block">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex gap-1 items-center">
            <NotepadText className="h-4 w-4" />
            Boards
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Link href="/feedback" className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-2 h-2 rounded-full",
                  getFeedbackBoardColorClass(null),
                )}
              />
              <span className="text-sm">All Feedback</span>
            </div>
            <Badge variant="secondary">{totalCount}</Badge>
          </Link>
          {boards.map((board) => (
            <Link
              key={board.id}
              href={`/feedback/boards/${board.slug}`}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    getFeedbackBoardColorClass(board.color),
                  )}
                />
                <span className="truncate text-sm">{board.title}</span>
              </div>
              <Badge variant="secondary">{board.threadCount}</Badge>
            </Link>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <FeedbackFilterDialog />
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Powered by{" "}
          <a
            href="https://usenextbase.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Nextbase
          </a>
        </p>
      </div>
    </div>
  );
}
