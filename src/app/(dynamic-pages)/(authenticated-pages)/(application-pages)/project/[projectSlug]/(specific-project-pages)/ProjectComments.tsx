"use client";
import { CommentList } from "@/components/Projects/CommentList";
import { useRealtimeComments } from "@/hooks/useRealtimeComments";

export function ProjectComments({ projectId }: { projectId: string }) {
  const { comments, isLoading } = useRealtimeComments(projectId);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="grid grid-auto-rows-min divide-y">
      <CommentList comments={comments} />
    </div>
  );
}
