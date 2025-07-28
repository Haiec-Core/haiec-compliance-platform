import {
  getFeedbackBoardBySlug,
  getPaginatedFeedbackThreadsByBoardId,
} from "@/data/admin/marketing-feedback";
import { notFound } from "next/navigation";
import type { FiltersSchema } from "../../[feedbackId]/schema";
import { BoardDetail } from "./BoardDetail";

interface AdminBoardDetailProps {
  boardSlug: string;
  filters: FiltersSchema;
}

export async function AdminBoardDetail({
  boardSlug,
  filters,
}: AdminBoardDetailProps) {
  const board = await getFeedbackBoardBySlug(boardSlug);
  if (!board) return notFound();

  const { data: feedbacks, count: totalPages } =
    await getPaginatedFeedbackThreadsByBoardId({
      boardId: board.id,
      ...filters,
    });

  return (
    <BoardDetail
      board={board}
      feedbacks={feedbacks}
      totalPages={totalPages ?? 0}
      userType="admin"
    />
  );
}
