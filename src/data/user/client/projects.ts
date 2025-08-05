import type { Tables } from "@/lib/database.types";
import { supabaseUserClientComponent } from "@/supabase-clients/user/supabaseUserClientComponent";
import { CommentWithUser } from "@/types";
import { normalizeComment } from "@/utils/comments";
import type { ProjectsFilterSchema } from "@/utils/zod-schemas/projects";

export async function getProjectsClient({
  workspaceId,
  filters,
}: {
  workspaceId: string;
  filters: ProjectsFilterSchema;
}) {
  const { query, sorting, page, perPage, statuses } = filters;

  let supabaseQuery = supabaseUserClientComponent
    .from("projects")
    .select("*", { count: "exact" })
    .eq("workspace_id", workspaceId);

  // Apply search filter if query exists
  if (query && query.trim()) {
    supabaseQuery = supabaseQuery.ilike("name", `%${query.trim()}%`);
  }

  // Apply status filter if statuses exist
  if (statuses && statuses.length > 0) {
    supabaseQuery = supabaseQuery.in("project_status", statuses);
  }

  // Apply sorting
  if (sorting && sorting.length > 0) {
    const { id, desc } = sorting[0] as { id: string; desc: boolean };
    const validSortColumns = [
      "name",
      "project_status",
      "created_at",
      "updated_at",
    ];

    if (validSortColumns.includes(id)) {
      supabaseQuery = supabaseQuery.order(id, { ascending: !desc });
    }
  } else {
    // Default sorting by created_at desc
    supabaseQuery = supabaseQuery.order("created_at", { ascending: false });
  }

  // Apply pagination
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  supabaseQuery = supabaseQuery.range(from, to);

  const { data, error, count } = await supabaseQuery;

  if (error) {
    throw error;
  }

  return {
    data: data as Tables<"projects">[],
    count: count ?? 0,
  };
}

export const getProjectCommentsClient = async (
  projectId: string,
): Promise<Array<CommentWithUser>> => {
  const { data, error } = await supabaseUserClientComponent
    .from("project_comments")
    .select("*, user_profiles(*)")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });
  console.log("comments data", data);
  if (error) {
    throw error;
  }

  return data.map(normalizeComment);
};
