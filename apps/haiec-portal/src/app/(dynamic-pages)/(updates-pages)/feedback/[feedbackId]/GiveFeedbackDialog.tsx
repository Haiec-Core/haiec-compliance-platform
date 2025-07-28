"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquare } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createInternalFeedbackAction } from "@/data/user/marketing-feedback";
import { cn } from "@/utils/cn";

type FeedbackType = "bug" | "feature_request" | "general";

const feedbackTypeList: Array<FeedbackType> = [
  "bug",
  "feature_request",
  "general",
];

const FeedbackLabelMap: Record<FeedbackType, string> = {
  bug: "Bug",
  feature_request: "Feature Request",
  general: "General",
};

const feedbackSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  type: z.enum(["bug", "feature_request", "general"]),
});

type FeedbackFormType = z.infer<typeof feedbackSchema>;

interface GiveFeedbackDialogProps {
  children: React.ReactNode;
  className?: string;
}

export const GiveFeedbackDialog: React.FC<GiveFeedbackDialogProps> = ({
  children,
  className,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toastRef = useRef<string | number | undefined>(undefined);

  const { control, handleSubmit, formState, reset } = useForm<FeedbackFormType>(
    {
      resolver: zodResolver(feedbackSchema),
      defaultValues: {
        type: "bug",
      },
    },
  );

  const { execute: createInternalFeedback, status } = useAction(
    createInternalFeedbackAction,
    {
      onExecute: () => {
        toastRef.current = toast.loading("Creating feedback...");
      },
      onSuccess: ({ data }) => {
        toast.success("Feedback created successfully", {
          id: toastRef.current,
        });
        toastRef.current = undefined;
        reset({}, { keepDefaultValues: false, keepValues: false });
        setIsOpen(false);
        if (data?.id) {
          router.push(`/feedback/${data.id}`);
        }
      },
      onError: ({ error }) => {
        const errorMessage = error.serverError ?? "Failed to create feedback";
        toast.error(errorMessage, { id: toastRef.current });
        toastRef.current = undefined;
      },
    },
  );

  const { isValid } = formState;

  const onSubmit = (data: FeedbackFormType) => {
    createInternalFeedback(data);
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
            <MessageSquare className="w-6 h-6" />
          </div>
          <div className="p-1 mb-4">
            <DialogTitle className="text-lg">Give Feedback</DialogTitle>
            <DialogDescription className="text-base">
              Help us improve by sharing feedback or just drop by and say Hi!
            </DialogDescription>
          </div>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          data-testid="give-feedback-form"
        >
          <div className="space-y-1">
            <Label>Title</Label>
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <Input
                  data-testid="feedback-title-input"
                  {...field}
                  placeholder="Title"
                />
              )}
            />
          </div>
          <div className="space-y-1">
            <Label>Content</Label>
            <Controller
              control={control}
              name="content"
              render={({ field }) => (
                <Input
                  data-testid="feedback-content-input"
                  {...field}
                  placeholder="Content"
                />
              )}
            />
          </div>
          <div className="space-y-1">
            <Label>Type</Label>
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <Select
                  aria-label="Feedback Type"
                  value={field.value}
                  data-testid="feedback-type-select"
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {feedbackTypeList.map((type) => (
                      <SelectItem key={type} value={type}>
                        {FeedbackLabelMap[type]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <Button
            className="w-full mt-4"
            data-testid="submit-feedback-button"
            disabled={!isValid || status === "executing"}
            type="submit"
          >
            {status === "executing" ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
