"use server";
import { supabaseAdminClient } from "@/supabase-clients/admin/supabaseAdminClient";
import { Enum } from "@/types";
import moment from "moment";

/**
 * Type definition for roadmap data items.
 * Represents the structure of a roadmap item fetched from the database.
 */
export type roadmapDataType = {
  id: string; // Unique identifier for the roadmap item
  title: string; // Title of the roadmap item
  description: string; // Description or content of the roadmap item
  status: Enum<"marketing_feedback_thread_status">; // Current status of the roadmap item
  priority: Enum<"marketing_feedback_thread_priority">; // Priority level of the roadmap item
  tag: Enum<"marketing_feedback_thread_type">; // Tag or type of the roadmap item
  date: string; // Date when the roadmap item was created, formatted as a string
};

/**
 * Fetches and returns the marketing roadmap items from the database.
 * The function retrieves items that are added to the roadmap and are publicly visible.
 * It categorizes the items into planned, in-progress, and completed based on their status.
 *
 * @returns An object containing arrays of planned, in-progress, and completed roadmap items.
 * @throws Will throw an error if the database query fails.
 */
export const getRoadmap = async () => {
  const roadmapItemsResponse = await supabaseAdminClient
    .from("marketing_feedback_threads")
    .select(
      `
      *,
      marketing_feedback_comments!thread_id(count),
      marketing_feedback_thread_reactions!thread_id(count)
    `,
    )
    .eq("added_to_roadmap", true)
    .eq("is_publicly_visible", true)
    .is("moderator_hold_category", null);

  if (roadmapItemsResponse.error) {
    throw roadmapItemsResponse.error;
  }

  const roadmapItems = roadmapItemsResponse.data;

  // Transform the raw data into a more usable format
  const roadmapArray = roadmapItems.map((item) => ({
    ...item,
    comment_count: item.marketing_feedback_comments[0]?.count ?? 0,
    reaction_count: item.marketing_feedback_thread_reactions[0]?.count ?? 0,
    date: moment(item.created_at).format("LL"),
  }));

  // Filter items based on their status
  const plannedCards = roadmapArray.filter((item) => item.status === "planned");
  const inProgress = roadmapArray.filter(
    (item) => item.status === "in_progress",
  );
  const completedCards = roadmapArray.filter(
    (item) => item.status === "completed",
  );

  return {
    plannedCards,
    inProgress,
    completedCards,
  };
};
