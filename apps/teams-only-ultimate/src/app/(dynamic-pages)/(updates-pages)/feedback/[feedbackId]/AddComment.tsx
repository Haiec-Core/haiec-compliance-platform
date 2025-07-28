"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addCommentToInternalFeedbackThreadAction } from "@/data/feedback";
import { Send } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface AddCommentProps {
  feedbackId: string;
  defaultValue?: string;
}

type AddCommentActionResult = Awaited<
  ReturnType<typeof addCommentToInternalFeedbackThreadAction>
>;

function AddComment({ feedbackId, defaultValue = "" }: AddCommentProps) {
  const [content, setContent] = useState<string>(defaultValue);
  const toastRef = useRef<string | number | undefined>(undefined);

  const { execute, status } = useAction(
    addCommentToInternalFeedbackThreadAction,
    {
      onExecute: () => {
        toastRef.current = toast.loading("Adding Comment...");
      },
      onSuccess: () => {
        toast.success("Successfully added your comment", {
          id: toastRef.current,
        });
        toastRef.current = undefined;
        setContent("");
      },
      onError: ({ error }) => {
        const errorMessage = error.serverError ?? "Failed to add comment";
        toast.error(errorMessage, { id: toastRef.current });
        toastRef.current = undefined;
      },
    },
  );

  const handleAddComment = () => {
    if (content.length > 0) {
      execute({ feedbackId, content });
    }
  };

  return (
    <div className="grid w-full gap-2" data-testid="add-comment-form">
      <Textarea
        name="comment-area"
        className="resize-none"
        placeholder="Type your message here."
        value={content}
        disabled={status === "executing"}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button
        name="add-comment-button"
        disabled={status === "executing" || content.length === 0}
        onClick={handleAddComment}
      >
        <Send className="h-4 w-4 mr-2" />
        Add Comment
      </Button>
    </div>
  );
}

export { AddComment };
