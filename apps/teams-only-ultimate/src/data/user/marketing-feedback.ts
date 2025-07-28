"use server";

import { Database } from "@/lib/database.types";
import { authActionClient } from "@/lib/safe-action";
import { createSupabaseUserServerActionClient } from "@/supabase-clients/user/createSupabaseUserServerActionClient";
import { createSupabaseUserServerComponentClient } from "@/supabase-clients/user/createSupabaseUserServerComponentClient";
import type { Enum } from "@/types";
import { serverGetLoggedInUserVerified } from "@/utils/server/serverGetLoggedInUser";
import { marketingFeedbackTypeEnum } from "@/utils/zod-schemas/feedback";
import { compact } from "lodash";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createReceivedFeedbackNotification } from "./notifications";
import { getUserFullName } from "./user";

export async function getLoggedInUserFeedbackList({
  query = "",
  types = [],
  statuses = [],
  priorities = [],
  page = 1,
  limit = 10,
  myFeedbacks = "false",
}: {
  page?: number;
  limit?: number;
  query?: string;
  types?: Array<Enum<"marketing_feedback_thread_type">>;
  statuses?: Array<Enum<"marketing_feedback_thread_status">>;
  priorities?: Array<Enum<"marketing_feedback_thread_priority">>;
  myFeedbacks?: string;
}) {
  console.log("myFeedbacks", myFeedbacks);
  const zeroIndexedPage = page - 1;
  const supabaseClient = await createSupabaseUserServerComponentClient();
  const userId = (await serverGetLoggedInUserVerified()).id;

  let supabaseQuery = supabaseClient
    .from("marketing_feedback_threads")
    .select(
      `
      *,
      marketing_feedback_comments!thread_id(count),
      marketing_feedback_thread_reactions!thread_id(count)
    `,
    )
    .or(
      `added_to_roadmap.eq.true,open_for_public_discussion.eq.true,is_publicly_visible.eq.true,user_id.eq.${userId}`,
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

  if (myFeedbacks === "true") {
    supabaseQuery = supabaseQuery.eq("user_id", userId);
  }

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

export async function getAllInternalFeedbackForLoggedInUser() {
  const user = await serverGetLoggedInUserVerified();
  const supabaseClient = await createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from("marketing_feedback_threads")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function getAllInternalFeedbackForUser(userId: string) {
  const supabaseClient = await createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from("marketing_feedback_threads")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function getAllInternalFeedback({
  query,
  types,
  statuses,
  priorities,
}: {
  query: string;
  types: Array<Enum<"marketing_feedback_thread_type">>;
  statuses: Array<Enum<"marketing_feedback_thread_status">>;
  priorities: Array<Enum<"marketing_feedback_thread_priority">>;
}) {
  const supabaseClient = await createSupabaseUserServerComponentClient();
  let supabaseQuery = supabaseClient
    .from("marketing_feedback_threads")
    .select("*");

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

  const { data, error } = await supabaseQuery.order("created_at", {
    ascending: false,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function getInternalFeedbackById(feedbackId: string) {
  const supabaseClient = await createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from("marketing_feedback_threads")
    .select("*")
    .eq("id", feedbackId);

  if (error) {
    throw error;
  }

  return data[0];
}

export async function updateInternalFeedbackStatus(
  feedbackId: string,
  status: Enum<"marketing_feedback_thread_status">,
) {
  const supabaseClient = await createSupabaseUserServerActionClient();
  const { error } = await supabaseClient
    .from("marketing_feedback_threads")
    .update({ status })
    .eq("id", feedbackId);

  if (error) {
    throw error;
  }
}

export async function updateInternalFeedbackPriority(
  feedbackId: string,
  priority: Enum<"marketing_feedback_thread_priority">,
) {
  const supabaseClient = await createSupabaseUserServerActionClient();
  const { error } = await supabaseClient
    .from("marketing_feedback_threads")
    .update({ priority })
    .eq("id", feedbackId);

  if (error) {
    throw error;
  }
}

export const updateInternalFeedbackType = async (
  feedbackId: string,
  type: Enum<"marketing_feedback_thread_type">,
) => {
  const supabaseClient = await createSupabaseUserServerActionClient();
  const { data, error } = await supabaseClient
    .from("marketing_feedback_threads")
    .update({ type })
    .eq("id", feedbackId);

  if (error) {
    throw error;
  }

  return data;
};

const createInternalFeedbackSchema = z.object({
  title: z.string(),
  content: z.string(),
  type: marketingFeedbackTypeEnum,
});

export const createInternalFeedbackAction = authActionClient
  .schema(createInternalFeedbackSchema)
  .action(
    async ({ parsedInput: { title, content, type }, ctx: { userId } }) => {
      const supabaseClient = await createSupabaseUserServerActionClient();

      const { data, error } = await supabaseClient
        .from("marketing_feedback_threads")
        .insert({
          title,
          content,
          type,
          user_id: userId,
        })
        .select("*")
        .single();

      if (error) {
        throw new Error(error.message);
      }

      const userFullName = await getUserFullName(userId);
      await createReceivedFeedbackNotification({
        feedbackId: data.id,
        feedbackTitle: data.title,
        feedbackCreatorFullName: userFullName || "User",
        feedbackCreatorId: userId,
      });

      revalidatePath("/feedback", "layout");
      revalidatePath("/app_admin", "layout");

      return data;
    },
  );

export async function createInternalFeedbackCommentAction(
  feedbackId: string,
  userId: string,
  content: string,
) {
  const supabaseClient = await createSupabaseUserServerActionClient();
  const { data, error } = await supabaseClient
    .from("marketing_feedback_comments")
    .insert({ thread_id: feedbackId, user_id: userId, content })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function toggleFeedbackThreadVisibility(
  threadId: string,
  isVisible: boolean,
) {
  const supabaseClient = await createSupabaseUserServerActionClient();
  const { data, error } = await supabaseClient
    .from("marketing_feedback_threads")
    .update({ added_to_roadmap: isVisible })
    .eq("id", threadId)
    .select("*");

  if (error) {
    throw error;
  }

  return data;
}

export async function toggleFeedbackThreadDiscussion(
  threadId: string,
  isOpen: boolean,
) {
  const supabaseClient = await createSupabaseUserServerActionClient();
  const { data, error } = await supabaseClient
    .from("marketing_feedback_threads")
    .update({ open_for_public_discussion: isOpen })
    .eq("id", threadId)
    .select("*");

  if (error) {
    throw error;
  }

  return data;
}

export async function createChangelog(title: string, changes: string) {
  const supabaseClient = await createSupabaseUserServerActionClient();
  const { data, error } = await supabaseClient
    .from("marketing_changelog")
    .insert({
      title,
      changes,
    })
    .select("*");

  if (error) {
    throw error;
  }

  return data[0];
}

export async function getChangelogById(changelogId: string) {
  const supabaseClient = await createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from("marketing_changelog")
    .select("*")
    .eq("id", changelogId);

  if (error) {
    throw error;
  }

  return data[0];
}

export async function updateChangelog(
  changelogId: string,
  title: string,
  changes: string,
) {
  const supabaseClient = await createSupabaseUserServerActionClient();
  const { data, error } = await supabaseClient
    .from("marketing_changelog")
    .update({
      title,
      changes,
    })
    .eq("id", changelogId)
    .select("*");

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteChangelog(changelogId: string) {
  const supabaseClient = await createSupabaseUserServerActionClient();
  const { data, error } = await supabaseClient
    .from("marketing_changelog")
    .delete()
    .eq("id", changelogId);

  if (error) {
    throw error;
  }

  return data;
}

export const getInternalFeedbackComments = async (feedbackId: string) => {
  const supabaseClient = await createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from("marketing_feedback_comments")
    .select("*")
    .eq("thread_id", feedbackId);

  if (error) {
    throw error;
  }

  return data;
};

export const getSlimInternalFeedback = async (feedbackId: string) => {
  const supabaseClient = await createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from("marketing_feedback_threads")
    .select("title,content,status")
    .eq("id", feedbackId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updateInternalFeedbackIsOpenForDiscussion = async (
  feedbackId: string,
  isOpen: boolean,
) => {
  const supabaseClient = await createSupabaseUserServerActionClient();
  const { data, error } = await supabaseClient
    .from("marketing_feedback_threads")
    .update({ open_for_public_discussion: isOpen })
    .eq("id", feedbackId)
    .select("*");

  if (error) {
    throw error;
  }

  return data;
};

export const updateInternalFeedbackIsAddedToRoadmap = async (
  feedbackId: string,
  isAdded: boolean,
) => {
  const supabaseClient = await createSupabaseUserServerActionClient();
  const { data, error } = await supabaseClient
    .from("marketing_feedback_threads")
    .update({ added_to_roadmap: isAdded })
    .eq("id", feedbackId)
    .select("*");

  if (error) {
    throw error;
  }

  return data;
};

export const addCommentToInternalFeedbackThread = async (
  feedbackId: string,
  content: string,
) => {
  const user = await serverGetLoggedInUserVerified();
  const supabaseClient = await createSupabaseUserServerActionClient();
  const { data, error } = await supabaseClient
    .from("marketing_feedback_comments")
    .insert({ thread_id: feedbackId, user_id: user.id, content })
    .select("*");

  if (error) {
    throw error;
  }

  revalidatePath(`/feedback`, "layout");
  revalidatePath("/app_admin", "layout");

  return data;
};

export async function userUpdateInternalFeedbackType({
  feedbackId,
  type,
}: {
  feedbackId: string;
  type: Enum<"marketing_feedback_thread_type">;
}) {
  const supabaseClient = await createSupabaseUserServerActionClient();
  const { data, error } = await supabaseClient
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

export async function getLoggedInUserFeedbackById(feedbackId: string) {
  const supabaseClient = await createSupabaseUserServerComponentClient();
  const user = await serverGetLoggedInUserVerified();

  const { data, error } = await supabaseClient
    .from("marketing_feedback_threads")
    .select("*")
    .eq("id", feedbackId)
    .or(
      `user_id.eq.${user.id},added_to_roadmap.eq.true,open_for_public_discussion.eq.true,is_publicly_visible.eq.true`,
    )
    .single();

  if (error) {
    console.error("Error fetching feedback:", error);
    return null;
  }

  return data;
}

type MarketingFeedbackBoard =
  Database["public"]["Tables"]["marketing_feedback_boards"]["Row"];
type MarketingFeedbackThread =
  Database["public"]["Tables"]["marketing_feedback_threads"]["Row"];
/**
 * Retrieves all feedback boards visible to logged-in users.
 * @returns Array of feedback boards
 */
export async function getLoggedInUserFeedbackBoards(): Promise<
  MarketingFeedbackBoard[]
> {
  const supabaseClient = await createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from("marketing_feedback_boards")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Gets a specific feedback board by its ID for logged-in users.
 * @param boardId - The ID of the board to retrieve
 * @returns The feedback board data or null if not found
 */
export async function getLoggedInUserFeedbackBoardById(
  boardId: string,
): Promise<MarketingFeedbackBoard | null> {
  const supabaseClient = await createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from("marketing_feedback_boards")
    .select("*")
    .eq("id", boardId)
    .eq("is_active", true)
    .single();

  if (error) {
    return null;
  }

  return data;
}

/**
 * Gets all feedback threads for a specific board for logged-in users.
 * Includes threads created by the user and public threads.
 */
export async function getLoggedInUserFeedbackThreadsByBoardId(
  boardId: string,
): Promise<MarketingFeedbackThread[]> {
  const supabaseClient = await createSupabaseUserServerComponentClient();
  const user = await serverGetLoggedInUserVerified();

  const { data, error } = await supabaseClient
    .from("marketing_feedback_threads")
    .select("*")
    .eq("board_id", boardId)
    .or(
      `user_id.eq.${user.id},added_to_roadmap.eq.true,open_for_public_discussion.eq.true,is_publicly_visible.eq.true`,
    )
    .is("moderator_hold_category", null)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Gets paginated feedback threads for a specific board for logged-in users.
 */
export async function getPaginatedLoggedInUserFeedbackThreadsByBoardId({
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
  const supabaseClient = await createSupabaseUserServerComponentClient();
  const user = await serverGetLoggedInUserVerified();
  const zeroIndexedPage = page - 1;

  let supabaseQuery = supabaseClient
    .from("marketing_feedback_threads")
    .select(
      `*,
      marketing_feedback_comments!thread_id(count),
      marketing_feedback_thread_reactions!thread_id(count)
    `,
    )
    .eq("board_id", boardId)
    .or(
      `user_id.eq.${user.id},added_to_roadmap.eq.true,open_for_public_discussion.eq.true,is_publicly_visible.eq.true`,
    )
    .is("moderator_hold_category", null)
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
    count: count ?? 0,
  };
}

/**
 * Subscribes a user to a feedback board
 */
export async function subscribeToBoardAction(boardId: string) {
  const supabaseClient = await createSupabaseUserServerActionClient();
  const user = await serverGetLoggedInUserVerified();

  const { error } = await supabaseClient
    .from("marketing_feedback_board_subscriptions")
    .insert({
      board_id: boardId,
      user_id: user.id,
    });

  if (error) {
    throw error;
  }

  revalidatePath("/feedback/boards");
}

/**
 * Unsubscribes a user from a feedback board
 */
export async function unsubscribeFromBoardAction(boardId: string) {
  const supabaseClient = await createSupabaseUserServerActionClient();
  const user = await serverGetLoggedInUserVerified();

  const { error } = await supabaseClient
    .from("marketing_feedback_board_subscriptions")
    .delete()
    .eq("board_id", boardId)
    .eq("user_id", user.id);

  if (error) {
    throw error;
  }

  revalidatePath("/feedback/boards");
}

/**
 * Checks if the current user is subscribed to a board
 */
export async function isSubscribedToBoard(boardId: string): Promise<boolean> {
  const supabaseClient = await createSupabaseUserServerComponentClient();
  const user = await serverGetLoggedInUserVerified();

  const { data, error } = await supabaseClient
    .from("marketing_feedback_board_subscriptions")
    .select("id")
    .eq("board_id", boardId)
    .eq("user_id", user.id)
    .single();

  if (error) {
    return false;
  }

  return !!data;
}

/**
 * Subscribes a user to a feedback thread
 */
export async function subscribeToThreadAction(threadId: string) {
  const supabaseClient = await createSupabaseUserServerActionClient();
  const user = await serverGetLoggedInUserVerified();

  const { error } = await supabaseClient
    .from("marketing_feedback_thread_subscriptions")
    .insert({
      thread_id: threadId,
      user_id: user.id,
    });

  if (error) {
    throw error;
  }

  revalidatePath(`/feedback/${threadId}`);
}

/**
 * Unsubscribes a user from a feedback thread
 */
export async function unsubscribeFromThreadAction(threadId: string) {
  const supabaseClient = await createSupabaseUserServerActionClient();
  const user = await serverGetLoggedInUserVerified();

  const { error } = await supabaseClient
    .from("marketing_feedback_thread_subscriptions")
    .delete()
    .eq("thread_id", threadId)
    .eq("user_id", user.id);

  if (error) {
    throw error;
  }

  revalidatePath(`/feedback/${threadId}`);
}

/**
 * Checks if the current user is subscribed to a thread
 */
export async function isSubscribedToThread(threadId: string): Promise<boolean> {
  const supabaseClient = await createSupabaseUserServerComponentClient();
  const user = await serverGetLoggedInUserVerified();

  const { data, error } = await supabaseClient
    .from("marketing_feedback_thread_subscriptions")
    .select("id")
    .eq("thread_id", threadId)
    .eq("user_id", user.id)
    .single();

  if (error) {
    return false;
  }

  return !!data;
}

/**
 * Gets all board subscriptions for the current user
 */
export async function getUserBoardSubscriptions(): Promise<
  MarketingFeedbackBoard[]
> {
  const supabaseClient = await createSupabaseUserServerComponentClient();
  const user = await serverGetLoggedInUserVerified();

  const { data, error } = await supabaseClient
    .from("marketing_feedback_board_subscriptions")
    .select(
      `
      board:marketing_feedback_boards(*)
    `,
    )
    .eq("user_id", user.id)
    .eq("marketing_feedback_boards.is_active", true);

  if (error) {
    throw error;
  }

  return compact(data.map((subscription) => subscription.board));
}

/**
 * Gets all thread subscriptions for the current user
 */
export async function getUserThreadSubscriptions(): Promise<
  MarketingFeedbackThread[]
> {
  const supabaseClient = await createSupabaseUserServerComponentClient();
  const user = await serverGetLoggedInUserVerified();

  const { data, error } = await supabaseClient
    .from("marketing_feedback_thread_subscriptions")
    .select(
      `
      thread:marketing_feedback_threads(*)
    `,
    )
    .eq("user_id", user.id)
    .is("marketing_feedback_threads.moderator_hold_category", null);

  if (error) {
    throw error;
  }

  return compact(data.map((subscription) => subscription.thread));
}

/**
 * Gets an active feedback board by its slug for logged-in users.
 */
export async function getLoggedInUserFeedbackBoardBySlug(slug: string) {
  const supabaseClient = await createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from("marketing_feedback_boards")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) {
    return null;
  }

  return data;
}

/**
 * Gets all visible feedback threads for a specific board by slug.
 */
export async function getLoggedInUserFeedbackThreadsByBoardSlug(slug: string) {
  const supabaseClient = await createSupabaseUserServerComponentClient();
  const user = await serverGetLoggedInUserVerified();
  const board = await getLoggedInUserFeedbackBoardBySlug(slug);

  if (!board) return [];

  const { data, error } = await supabaseClient
    .from("marketing_feedback_threads")
    .select("*")
    .eq("board_id", board.id)
    .or(
      `user_id.eq.${user.id},added_to_roadmap.eq.true,open_for_public_discussion.eq.true,is_publicly_visible.eq.true`,
    )
    .is("moderator_hold_category", null)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}
