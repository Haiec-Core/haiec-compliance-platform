"use client";

import { FormSelect } from "@/components/form-components/FormSelect";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { updateFeedbackThreadBoardAction } from "@/data/admin/marketing-feedback";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layout } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const boardSelectionSchema = z.object({
  boardId: z.string().nullable(),
});

type BoardSelectionForm = z.infer<typeof boardSelectionSchema>;

interface BoardSelectionDialogProps {
  feedbackId: string;
  currentBoardId: string | null;
  boards: Array<{
    id: string;
    title: string;
  }>;
}

export function BoardSelectionDialog({
  feedbackId,
  currentBoardId,
  boards,
}: BoardSelectionDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const form = useForm<BoardSelectionForm>({
    resolver: zodResolver(boardSelectionSchema),
    defaultValues: {
      boardId: currentBoardId,
    },
  });

  const { execute: updateBoard, status } = useAction(
    updateFeedbackThreadBoardAction,
    {
      onSuccess: () => {
        toast.success("Board updated successfully");
        setIsOpen(false);
        router.refresh();
      },
      onError: ({ error }) => {
        toast.error(error.serverError || "Failed to update board");
      },
    },
  );

  const onSubmit = (data: BoardSelectionForm) => {
    updateBoard({
      threadId: feedbackId,
      boardId: data.boardId === "none" ? null : data.boardId,
    });
  };

  const boardOptions = [
    { label: "None", value: "none" },
    ...boards.map((board) => ({
      label: board.title,
      value: board.id,
    })),
  ];

  const currentBoard = boards.find((board) => board.id === currentBoardId);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
          <Layout className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm capitalize">
            Board:{" "}
            <Badge variant="outline">{currentBoard?.title || "None"}</Badge>
          </span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Board</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormSelect
              control={form.control}
              name="boardId"
              label="Select Board"
              id="board-selection"
              options={boardOptions}
              placeholder="Select a board"
            />
            <Button
              type="submit"
              className="w-full"
              disabled={status === "executing"}
            >
              {status === "executing" ? "Updating..." : "Update Board"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
