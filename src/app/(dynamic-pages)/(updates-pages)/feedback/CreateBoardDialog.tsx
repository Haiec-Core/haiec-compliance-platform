"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LayoutDashboard } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { SelectFeedbackBoardColor } from "@/components/form-components/SelectFeedbackBoardColor";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createFeedbackBoardAction } from "@/data/admin/marketing-feedback";
import { cn } from "@/utils/cn";

const boardSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must contain only lowercase letters, numbers, and hyphens",
    ),
  color: z.string().optional(),
});

type BoardFormType = z.infer<typeof boardSchema>;

interface CreateBoardDialogProps {
  children: React.ReactNode;
  className?: string;
}

export const CreateBoardDialog: React.FC<CreateBoardDialogProps> = ({
  children,
  className,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toastRef = useRef<string | number | undefined>(undefined);

  const form = useForm<BoardFormType>({
    resolver: zodResolver(boardSchema),
    defaultValues: {
      title: "New Board",
      description: "New Board Description",
      slug: "new-board",
      color: "blue",
    },
  });

  const { control, handleSubmit, formState, reset } = form;

  const { execute: createBoard, status } = useAction(
    createFeedbackBoardAction,
    {
      onExecute: () => {
        toastRef.current = toast.loading("Creating board...");
      },
      onSuccess: ({ data }) => {
        toast.success("Board created successfully", {
          id: toastRef.current,
        });
        toastRef.current = undefined;
        reset();
        setIsOpen(false);
        if (data?.slug) {
          router.push(`/feedback/boards/${data.slug}`);
        }
      },
      onError: ({ error }) => {
        const errorMessage = error.serverError ?? "Failed to create board";
        toast.error(errorMessage, { id: toastRef.current });
        toastRef.current = undefined;
      },
    },
  );

  const { isValid } = formState;

  const onSubmit = (data: BoardFormType) => {
    createBoard(data);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(newIsOpen) => {
        setIsOpen(newIsOpen);
      }}
    >
      <DialogTrigger className={cn("w-full", className)}>
        {children}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 rounded-lg">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <div className="p-1 mb-4">
            <DialogTitle className="text-lg">Create Feedback Board</DialogTitle>
            <DialogDescription className="text-base">
              Create a new board to organize and collect feedback
            </DialogDescription>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            data-testid="create-board-form"
          >
            <div className="space-y-1">
              <Label>Title</Label>
              <Controller
                control={control}
                name="title"
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      data-testid="board-title-input"
                      {...field}
                      placeholder="e.g., Feature Requests"
                    />
                    {fieldState.error && (
                      <p className="text-sm text-red-500">
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div className="space-y-1">
              <Label>Description</Label>
              <Controller
                control={control}
                name="description"
                render={({ field, fieldState }) => (
                  <>
                    <Textarea
                      data-testid="board-description-input"
                      {...field}
                      placeholder="Describe the purpose of this board"
                    />
                    {fieldState.error && (
                      <p className="text-sm text-red-500">
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div className="space-y-1">
              <Label>Slug</Label>
              <Controller
                control={control}
                name="slug"
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      data-testid="board-slug-input"
                      {...field}
                      placeholder="e.g., feature-requests"
                    />
                    {fieldState.error && (
                      <p className="text-sm text-red-500">
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                )}
              />
              <p className="text-sm text-gray-500">
                This will be used in the URL: /feedback/boards/your-slug
              </p>
            </div>
            <div className="space-y-1">
              <Label>Color</Label>
              <SelectFeedbackBoardColor
                control={control}
                name="color"
                description="Choose a color for your board"
              />
            </div>
            <Button
              className="w-full mt-4"
              data-testid="submit-board-button"
              disabled={!isValid || status === "executing"}
              type="submit"
            >
              {status === "executing" ? "Creating..." : "Create Board"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
