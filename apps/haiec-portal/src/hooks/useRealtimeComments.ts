"use client";

import { getProjectCommentsClient } from "@/data/user/client/projects";
import { supabaseUserClientComponent } from "@/supabase-clients/user/supabaseUserClientComponent";
import type { CommentWithUser } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

/**
 * Custom hook to fetch and subscribe to realtime project comments
 * @param projectId - The ID of the project whose comments to fetch and subscribe to
 * @returns Object containing comments data and loading state
 */
export function useRealtimeComments(projectId: string) {
  const {
    data: comments = [],
    isLoading,
    refetch,
  } = useQuery<CommentWithUser[]>({
    queryKey: ["projectComments", projectId],
    queryFn: () => getProjectCommentsClient(projectId),
    initialData: [],
    staleTime: 0,
  });
  const queryClient = useQueryClient();
  // Set up realtime subscription
  useEffect(() => {
    console.log("setting up realtime subscription", projectId);
    const channelId = `project-comments:${projectId}`;
    const channel = supabaseUserClientComponent
      .channel(channelId)
      .on(
        "postgres_changes",
        {
          event: "*", // Listen to all events (INSERT, UPDATE, DELETE)
          schema: "public",
          table: "project_comments",
          filter: `project_id=eq.${projectId}`,
        },
        () => {
          console.log("invalidating", projectId);
          queryClient.invalidateQueries({
            queryKey: ["projectComments", projectId],
          });
        },
      )
      .subscribe(() => {
        console.log("subscribed");
      });

    return () => {
      supabaseUserClientComponent.removeChannel(channel);
    };
  }, [projectId, refetch]);
  console.log("comments", comments);
  return {
    comments,
    isLoading,
  };
}
