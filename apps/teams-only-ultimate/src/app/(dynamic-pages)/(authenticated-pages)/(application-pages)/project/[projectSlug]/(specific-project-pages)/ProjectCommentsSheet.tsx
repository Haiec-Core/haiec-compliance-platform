"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MessageCircle } from "lucide-react";
import { CommentInput } from "./CommentInput";
import { ProjectComments } from "./ProjectComments";

export function ProjectCommentsSheet({
  projectId,
  projectSlug,
}: {
  projectId: string;
  projectSlug: string;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <MessageCircle className="w-5 h-5" />
          Comments
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0">
        <div className="h-full grid grid-rows-[auto_1fr_auto] divide-y-2">
          <div className="px-6 py-4">
            <SheetTitle>Comments</SheetTitle>
            <SheetDescription>
              List of comments in recent first order
            </SheetDescription>
          </div>

          <div className="overflow-y-auto space-y-2">
            <ProjectComments projectId={projectId} />
          </div>
          <div className="p-6 space-y-2">
            <SheetTitle>Add Comment</SheetTitle>
            <CommentInput
              projectId={projectId}
              projectSlug={projectSlug}
            ></CommentInput>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
