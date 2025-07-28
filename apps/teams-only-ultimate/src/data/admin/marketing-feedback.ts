"use server";
import { adminActionClient } from "@/lib/safe-action";
import { supabaseAdminClient } from "@/supabase-clients/admin/supabaseAdminClient";
import type { Enum } from "@/types";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { adminToggleFeedbackOpenForCommentsAction } from "../feedback";

/**
 * Retrieves a paginated list of internal feedback threads based on the provided filters and pagination options.
 * @param query - Search query to filter feedback threads by title.
 * @param types - Array of feedback thread types to filter by.
 * @param statuses - Array of feedback thread statuses to filter by.
 * @param priorities - Array of feedback thread priorities to filter by.
 * @param page - The page number for pagination.
 * @param limit - The number of items per page.
 * @param sort - Sort order for the feedback threads, either ascending or descending by creation date.
 * @returns An object containing the data and count of feedback threads.
 */
export const getPaginatedInternalFeedbackList = async ({
  query = "",
  types = [],
  statuses = [],
  priorities = [],
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
  query?: string;
  types?: Array<Enum<"marketing_feedback_thread_type">>;
  statuses?: Array<Enum<"marketing_feedback_thread_status">>;
  priorities?: Array<Enum<"marketing_feedback_thread_priority">>;
}) => {
  const zeroIndexedPage = page - 1;

  // Create base query with comment counts as a subquery
  let supabaseQuery = supabaseAdminClient
    .from("marketing_feedback_threads")
    .select(
      `
      *,
      comment_count:marketing_feedback_comments!marketing_feedback_comments_thread_id_fkey(count),
      reaction_count:marketing_feedback_thread_reactions(count)
    `,
    )
    .range(zeroIndexedPage * limit, (zeroIndexedPage + 1) * limit - 1);

  if (query) {
    supabaseQuery = supabaseQuery.ilike("title", `%${query}%`);
  }

  if (types.length > 0) {
    supabaseQuery = supabaseQuery.in("type", types);
  }

  if (statuses.length > 0) {
    supabaseQuery = supabaseQuery.in("status", statuses);
  }

  if (priorities.length > 0) {
    supabaseQuery = supabaseQuery.in("priority", priorities);
  }

  supabaseQuery = supabaseQuery.order("created_at", { ascending: false });

  const { data, count, error } = await supabaseQuery;

  if (error) {
    throw error;
  }

  return {
    data: data?.map((thread) => ({
      ...thread,
      comment_count: thread.comment_count?.[0]?.count ?? 0,
      reaction_count: thread.reaction_count?.[0]?.count ?? 0,
    })),
    count,
  };
};

/**
 * Calculates the total number of pages for internal feedback threads based on the provided filters and pagination options.
 * @param query - Search query to filter feedback threads by title.
 * @param types - Array of feedback thread types to filter by.
 * @param statuses - Array of feedback thread statuses to filter by.
 * @param priorities - Array of feedback thread priorities to filter by.
 * @param page - The page number for pagination.
 * @param limit - The number of items per page.
 * @param sort - Sort order for the feedback threads, either ascending or descending by creation date.
 * @returns The total number of pages.
 */
export async function getInternalFeedbackTotalPages({
  query = "",
  types = [],
  statuses = [],
  priorities = [],
  page = 1,
  limit = 10,
  sort = "desc",
}: {
  page?: number;
  limit?: number;
  query?: string;
  types?: Array<Enum<"marketing_feedback_thread_type">>;
  statuses?: Array<Enum<"marketing_feedback_thread_status">>;
  priorities?: Array<Enum<"marketing_feedback_thread_priority">>;
  sort?: "asc" | "desc";
}) {
  const zeroIndexedPage = page - 1; // Convert to zero-indexed page for database query
  let supabaseQuery = supabaseAdminClient
    .from("marketing_feedback_threads")
    .select("id", {
      count: "exact",
      head: true,
    })
    .range(zeroIndexedPage * limit, (zeroIndexedPage + 1) * limit - 1);

  if (query) {
    supabaseQuery = supabaseQuery.ilike("title", `%${query}%`);
  }

  if (types.length > 0) {
    supabaseQuery = supabaseQuery.in("type", types);
  }

  if (statuses.length > 0) {
    supabaseQuery = supabaseQuery.in("status", statuses);
  }

  if (priorities.length > 0) {
    supabaseQuery = supabaseQuery.in("priority", priorities);
  }

  if (sort === "asc") {
    supabaseQuery = supabaseQuery.order("created_at", { ascending: true });
  } else {
    supabaseQuery = supabaseQuery.order("created_at", { ascending: false });
  }

  const { count, error } = await supabaseQuery;
  if (error) {
    throw error;
  }

  if (!count) {
    return 0;
  }

  return Math.ceil(count / limit) ?? 0;
}

/**
 * Updates the status of a specific internal feedback thread.
 * @param feedbackId - The ID of the feedback thread to update.
 * @param status - The new status to set for the feedback thread.
 */
export async function updateInternalFeedbackStatus(
  feedbackId: string,
  status: Enum<"marketing_feedback_thread_status">,
) {
  const { error } = await supabaseAdminClient
    .from("marketing_feedback_threads")
    .update({ status })
    .eq("id", feedbackId);

  if (error) {
    throw error;
  }
}

/**
 * Updates the priority of a specific internal feedback thread.
 * @param feedbackId - The ID of the feedback thread to update.
 * @param priority - The new priority to set for the feedback thread.
 */
export async function updateInternalFeedbackPriority(
  feedbackId: string,
  priority: Enum<"marketing_feedback_thread_priority">,
) {
  const { error } = await supabaseAdminClient
    .from("marketing_feedback_threads")
    .update({ priority })
    .eq("id", feedbackId);

  if (error) {
    throw error;
  }
}

/**
 * Updates the type of a specific internal feedback thread.
 * @param feedbackId - The ID of the feedback thread to update.
 * @param type - The new type to set for the feedback thread.
 * @returns The updated feedback thread data.
 */
export const updateInternalFeedbackType = async (
  feedbackId: string,
  type: Enum<"marketing_feedback_thread_type">,
) => {
  const { data, error } = await supabaseAdminClient
    .from("marketing_feedback_threads")
    .update({ type })
    .eq("id", feedbackId);

  if (error) {
    throw error;
  }

  return data;
};

/**
 * Creates a new internal feedback thread.
 * @param userId - The ID of the user creating the feedback.
 * @param payload - The feedback details including title, content, and type.
 * @returns The newly created feedback thread data.
 */
export async function createInternalFeedback(
  userId: string,
  payload: {
    title: string;
    content: string;
    type: Enum<"marketing_feedback_thread_type">;
  },
) {
  const { data, error } = await supabaseAdminClient
    .from("marketing_feedback_threads")
    .insert({
      title: payload.title,
      content: payload.content,
      type: payload.type,
      user_id: userId,
    })
    .select("*");

  if (error) {
    throw error;
  }

  return data[0];
}

/**
 * Adds a comment to an existing internal feedback thread.
 * @param feedbackId - The ID of the feedback thread to comment on.
 * @param userId - The ID of the user adding the comment.
 * @param content - The content of the comment.
 * @returns The newly created comment data.
 */
export async function createInternalFeedbackComment(
  feedbackId: string,
  userId: string,
  content: string,
) {
  const { data, error } = await supabaseAdminClient
    .from("marketing_feedback_comments")
    .insert({ thread_id: feedbackId, user_id: userId, content })
    .select("*");

  if (error) {
    throw error;
  }

  return data[0];
}

/**
 * Toggles the visibility of a feedback thread on the roadmap.
 * @param threadId - The ID of the feedback thread to update.
 * @param isVisible - Boolean indicating if the thread should be visible on the roadmap.
 */
export async function toggleFeedbackThreadVisibility(
  threadId: string,
  isVisible: boolean,
) {
  const { data, error } = await supabaseAdminClient
    .from("marketing_feedback_threads")
    .update({ added_to_roadmap: isVisible })
    .eq("id", threadId)
    .select("*");

  if (error) {
    throw error;
  }

  await adminToggleFeedbackOpenForCommentsAction({
    feedbackId: threadId,
    isOpenForComments: isVisible,
  });
}

/**
 * Toggles the public discussion status of a feedback thread.
 * @param threadId - The ID of the feedback thread to update.
 * @param isOpen - Boolean indicating if the thread should be open for public discussion.
 * @returns The updated feedback thread data.
 */
export async function toggleFeedbackThreadDiscussion(
  threadId: string,
  isOpen: boolean,
) {
  const { data, error } = await supabaseAdminClient
    .from("marketing_feedback_threads")
    .update({ open_for_public_discussion: isOpen })
    .eq("id", threadId)
    .select("*");

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Retrieves a simplified version of an internal feedback thread.
 * @param feedbackId - The ID of the feedback thread to retrieve.
 * @returns The feedback thread data including title, content, and status.
 */
export const appAdminGetSlimInternalFeedback = async (feedbackId: string) => {
  const { data, error } = await supabaseAdminClient
    .from("marketing_feedback_threads")
    .select("title,content,status")
    .eq("id", feedbackId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

/**
 * Retrieves all comments for a specific internal feedback thread.
 * @param feedbackId - The ID of the feedback thread to retrieve comments for.
 * @returns An array of comments for the feedback thread.
 */
export const appAdminGetInternalFeedbackComments = async (
  feedbackId: string,
) => {
  const { data, error } = await supabaseAdminClient
    .from("marketing_feedback_comments")
    .select("*")
    .eq("thread_id", feedbackId);

  if (error) {
    throw error;
  }

  return data;
};

/**
 * Updates the type of an internal feedback thread as an admin.
 * @param feedbackId - The ID of the feedback thread to update.
 * @param type - The new type to set for the feedback thread.
 * @returns The updated feedback thread data.
 */
export async function adminUpdateInternalFeedbackType({
  feedbackId,
  type,
}: {
  feedbackId: string;
  type: Enum<"marketing_feedback_thread_type">;
}) {
  const { data, error } = await supabaseAdminClient
    .from("marketing_feedback_threads")
    .update({ type })
    .eq("id", feedbackId)
    .select("*")
    .single();

  if (error) {
    throw error;
  }
  revalidatePath("/feedback");
  revalidatePath("/feedback");
  return data;
}

/**
 * Updates the status of an internal feedback thread as an admin.
 * @param feedbackId - The ID of the feedback thread to update.
 * @param status - The new status to set for the feedback thread.
 * @returns The updated feedback thread data.
 */
export async function adminUpdateInternalFeedbackStatus({
  feedbackId,
  status,
}: {
  feedbackId: string;
  status: Enum<"marketing_feedback_thread_status">;
}) {
  const { data, error } = await supabaseAdminClient
    .from("marketing_feedback_threads")
    .update({ status })
    .eq("id", feedbackId)
    .select("*")
    .single();

  if (error) {
    throw error;
  }
  revalidatePath("/feedback");
  revalidatePath("/feedback");
  return data;
}

/**
 * Updates the priority of an internal feedback thread as an admin.
 * @param feedbackId - The ID of the feedback thread to update.
 * @param priority - The new priority to set for the feedback thread.
 * @returns The updated feedback thread data.
 */
export async function adminUpdateInternalFeedbackPriority({
  feedbackId,
  priority,
}: {
  feedbackId: string;
  priority: Enum<"marketing_feedback_thread_priority">;
}) {
  const { data, error } = await supabaseAdminClient
    .from("marketing_feedback_threads")
    .update({ priority })
    .eq("id", feedbackId)
    .select("*")
    .single();

  if (error) {
    throw error;
  }
  revalidatePath("/feedback", "layout");
  return data;
}

/**
 * Updates the roadmap visibility of an internal feedback thread as an admin.
 * @param feedbackId - The ID of the feedback thread to update.
 * @param isAddedToRoadmap - Boolean indicating if the thread should be added to the roadmap.
 * @returns The updated feedback thread data.
 */
export const adminUpdateInternalFeedbackAddedToRoadmap = async ({
  feedbackId,
  isAddedToRoadmap,
}: {
  feedbackId: string;
  isAddedToRoadmap: boolean;
}) => {
  const { data, error } = await supabaseAdminClient
    .from("marketing_feedback_threads")
    .update({ added_to_roadmap: isAddedToRoadmap })
    .eq("id", feedbackId)
    .select("*");

  if (error) {
    throw error;
  }

  revalidatePath("/feedback", "layout");
  return data;
};

/**
 * Updates the public discussion visibility of an internal feedback thread as an admin.
 * @param feedbackId - The ID of the feedback thread to update.
 * @param isOpenToDiscussion - Boolean indicating if the thread should be open for public discussion.
 * @returns The updated feedback thread data.
 */
export const adminUpdateInternalFeedbackVisibility = async ({
  feedbackId,
  isOpenToDiscussion,
}: {
  feedbackId: string;
  isOpenToDiscussion: boolean;
}) => {
  const { data, error } = await supabaseAdminClient
    .from("marketing_feedback_threads")
    .update({ open_for_public_discussion: isOpenToDiscussion })
    .eq("id", feedbackId)
    .select("*");

  if (error) {
    throw error;
  }

  revalidatePath("/feedback", "layout");
  return data;
};

/**
 * Retrieves a specific internal feedback thread by its ID.
 * @param feedbackId - The ID of the feedback thread to retrieve.
 * @returns The feedback thread data.
 */
export async function adminGetInternalFeedbackById(feedbackId: string) {
  const { data, error } = await supabaseAdminClient
    .from("marketing_feedback_threads")
    .select("*")
    .eq("id", feedbackId);

  if (error) {
    throw error;
  }

  return data[0];
}

/**
 * Retrieves all feedback boards.
 * @returns Array of feedback boards
 */
export async function getFeedbackBoards() {
  const { data, error } = await supabaseAdminClient
    .from("marketing_feedback_boards")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

const createBoardSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/),
  color: z.string().optional(),
});

export const createFeedbackBoardAction = adminActionClient
  .schema(createBoardSchema)
  .action(
    async ({
      parsedInput: { title, description, slug, color },
      ctx: { userId },
    }) => {
      const { data, error } = await supabaseAdminClient
        .from("marketing_feedback_boards")
        .insert({
          title,
          description,
          slug,
          color,
          created_by: userId,
          is_active: true,
        })
        .select("*")
        .single();

      if (error) {
        throw new Error(error.message);
      }

      revalidatePath("/feedback/boards", "layout");
      return data;
    },
  );

/**
 * Updates an existing feedback board.
 */
export async function updateFeedbackBoard({
  boardId,
  title,
  description,
  slug,
  isActive,
}: {
  boardId: string;
  title?: string;
  description?: string;
  slug?: string;
  isActive?: boolean;
}) {
  const updateData: Record<string, unknown> = {};
  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (slug !== undefined) updateData.slug = slug;
  if (isActive !== undefined) updateData.is_active = isActive;

  const { data, error } = await supabaseAdminClient
    .from("marketing_feedback_boards")
    .update(updateData)
    .eq("id", boardId)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  revalidatePath("/feedback/boards");
  return data;
}

/**
 * Deletes a feedback board.
 */
export async function deleteFeedbackBoard(boardId: string) {
  const { error } = await supabaseAdminClient
    .from("marketing_feedback_boards")
    .delete()
    .eq("id", boardId);

  if (error) {
    throw error;
  }

  revalidatePath("/feedback/boards");
}

const updateFeedbackThreadBoardSchema = z.object({
  threadId: z.string(),
  boardId: z.string().nullish(),
});

export const updateFeedbackThreadBoardAction = adminActionClient
  .schema(updateFeedbackThreadBoardSchema)
  .action(async ({ parsedInput: { threadId, boardId } }) => {
    const { data, error } = await supabaseAdminClient
      .from("marketing_feedback_threads")
      .update({ board_id: boardId ?? null })
      .eq("id", threadId)
      .select("*")
      .single();

    if (error) {
      throw new Error("Failed to update feedback board");
    }

    return data;
  });

/**
 * Gets a feedback board by its ID.
 */
export async function getFeedbackBoardById(boardId: string) {
  const { data, error } = await supabaseAdminClient
    .from("marketing_feedback_boards")
    .select("*")
    .eq("id", boardId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Gets all feedback threads for a specific board.
 */
export async function getFeedbackThreadsByBoardId(boardId: string) {
  const { data, error } = await supabaseAdminClient
    .from("marketing_feedback_threads")
    .select(
      `*,
      marketing_feedback_comments!thread_id(count),
      marketing_feedback_thread_reactions!thread_id(count)
    `,
    )
    .eq("board_id", boardId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data?.map((thread) => ({
    ...thread,
    comment_count: thread.marketing_feedback_comments[0]?.count ?? 0,
    reaction_count: thread.marketing_feedback_thread_reactions[0]?.count ?? 0,
  }));
}

/**
 * Gets paginated feedback threads for a specific board with filtering.
 */
export async function getPaginatedFeedbackThreadsByBoardId({
  boardId,
  query = "",
  types = [],
  statuses = [],
  priorities = [],
  page = 1,
  limit = 10,
}: {
  boardId: string;
  page?: number;
  limit?: number;
  query?: string;
  types?: Array<Enum<"marketing_feedback_thread_type">>;
  statuses?: Array<Enum<"marketing_feedback_thread_status">>;
  priorities?: Array<Enum<"marketing_feedback_thread_priority">>;
}) {
  const zeroIndexedPage = page - 1;
  let supabaseQuery = supabaseAdminClient
    .from("marketing_feedback_threads")
    .select(
      `*,
      marketing_feedback_comments!thread_id(count),
      marketing_feedback_thread_reactions!thread_id(count)
    `,
    )
    .eq("board_id", boardId)
    .range(zeroIndexedPage * limit, (zeroIndexedPage + 1) * limit - 1);

  if (query) {
    supabaseQuery = supabaseQuery.ilike("title", `%${query}%`);
  }

  if (types.length > 0) {
    supabaseQuery = supabaseQuery.in("type", types);
  }

  if (statuses.length > 0) {
    supabaseQuery = supabaseQuery.in("status", statuses);
  }

  if (priorities.length > 0) {
    supabaseQuery = supabaseQuery.in("priority", priorities);
  }
  supabaseQuery = supabaseQuery.order("created_at", { ascending: false });

  const { data, count, error } = await supabaseQuery;

  if (error) {
    throw error;
  }

  return {
    data: data?.map((thread) => ({
      ...thread,
      comment_count: thread.marketing_feedback_comments[0]?.count ?? 0,
      reaction_count: thread.marketing_feedback_thread_reactions[0]?.count ?? 0,
    })),
    count,
  };
}

/**
 * Gets a feedback board by its slug.
 */
export async function getFeedbackBoardBySlug(slug: string) {
  const { data, error } = await supabaseAdminClient
    .from("marketing_feedback_boards")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Gets all feedback threads for a specific board by slug.
 */
export async function getFeedbackThreadsByBoardSlug(slug: string) {
  const board = await getFeedbackBoardBySlug(slug);
  if (!board) return [];

  const { data, error } = await supabaseAdminClient
    .from("marketing_feedback_threads")
    .select("*")
    .eq("board_id", board.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Gets all feedback boards with their thread counts
 */
export async function getFeedbackBoardsWithCounts() {
  const { data, error } = await supabaseAdminClient
    .from("marketing_feedback_boards")
    .select(
      `*,marketing_feedback_threads (count)
    `,
    )
    .eq("is_active", true);

  if (error) {
    throw error;
  }

  return data.map((board) => ({
    ...board,
    threadCount: board.marketing_feedback_threads?.[0]?.count ?? 0,
  }));
}

/**
 * Gets total count of all feedback threads
 */
export async function getTotalFeedbackCount() {
  const { count, error } = await supabaseAdminClient
    .from("marketing_feedback_threads")
    .select("*", { count: "exact", head: true });

  if (error) {
    throw error;
  }

  return count ?? 0;
}

export async function getBoardById(boardId: string) {
  const { data, error } = await supabaseAdminClient
    .from("marketing_feedback_boards")
    .select("*")
    .eq("id", boardId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}
