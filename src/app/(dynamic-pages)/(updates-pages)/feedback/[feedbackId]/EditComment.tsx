"use client";

import { Button } from "@/components/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ownerUpdateMarketingFeedbackCommentAction } from "@/data/feedback";
import { PenLine, Send } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface EditCommentProps {
  feedbackId: string;
  commentId: string;
  userId: string;
  defaultValue?: string;
}

function EditComment({
  feedbackId,
  commentId,
  userId,
  defaultValue = "",
}: EditCommentProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [comment, setComment] = useState<string>(defaultValue);
  const toastRef = useRef<string | number | undefined>(undefined);

  const { execute, isPending } = useAction(
    ownerUpdateMarketingFeedbackCommentAction,
    {
      onExecute: () => {
        toastRef.current = toast.loading("Updating comment...");
      },
      onSuccess: () => {
        toast.success("Successfully updated your comment", {
          id: toastRef.current,
        });
        toastRef.current = undefined;
        setComment("");
        setOpen(false);
      },
      onError: ({ error }) => {
        const errorMessage = error.serverError ?? "Failed to update comment";
        toast.error(errorMessage, { id: toastRef.current });
        toastRef.current = undefined;
      },
    },
  );

  const handleUpdateComment = () => {
    if (comment.length > 0) {
      execute({
        feedbackId,
        feedbackCommentOwnerId: userId,
        commentId,
        content: comment,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <PenLine className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update your comment</DialogTitle>
          <DialogDescription>
            This action will update your comment.
          </DialogDescription>
        </DialogHeader>
        <div className="grid w-full gap-2">
          <Textarea
            placeholder="Type your message here."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button
            disabled={isPending || comment.length === 0}
            onClick={handleUpdateComment}
          >
            <Send className="h-4 w-4 mr-2" />
            Update message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { EditComment };
