import {
  getAnonFeedbackBoardBySlug,
  getPaginatedAnonFeedbackThreadsByBoardId,
} from "@/data/anon/marketing-feedback";
import { notFound } from "next/navigation";
import type { FiltersSchema } from "../../[feedbackId]/schema";
import { BoardDetail } from "./BoardDetail";

interface AnonBoardDetailProps {
  boardSlug: string;
  filters: FiltersSchema;
}

export async function AnonBoardDetail({
  boardSlug,
  filters,
}: AnonBoardDetailProps) {
  const board = await getAnonFeedbackBoardBySlug(boardSlug);
  if (!board) return notFound();

  const { data: feedbacks, count: totalPages } =
    await getPaginatedAnonFeedbackThreadsByBoardId({
      boardId: board.id,
      ...filters,
    });

  return (
    <BoardDetail
      board={board}
      feedbacks={feedbacks}
      totalPages={totalPages ?? 0}
      userType="anon"
    />
  );
}
