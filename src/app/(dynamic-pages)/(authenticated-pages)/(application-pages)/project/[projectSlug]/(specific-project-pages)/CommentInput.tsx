"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createProjectCommentAction } from "@/data/user/projects";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";

const addCommentSchema = z.object({
  text: z.string().min(1),
});

type AddCommentSchema = z.infer<typeof addCommentSchema>;

type InFlightComment = {
  children: React.ReactNode;
  id: string | number;
};

export const CommentInput = ({
  projectId,
  projectSlug,
}: {
  projectId: string;
  projectSlug: string;
}) => {
  const { execute: addComment, isPending } = useAction(
    createProjectCommentAction,
  );

  const { handleSubmit, setValue, register } = useForm<AddCommentSchema>({
    resolver: zodResolver(addCommentSchema),
    defaultValues: {
      text: "",
    },
  });
  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          addComment({
            text: data.text,
            projectId,
            projectSlug,
          });
          setValue("text", "");
        })}
      >
        <div className="space-y-3">
          <Textarea
            id="text"
            placeholder="Share your thoughts"
            className="bg-gray-200/50 dark:bg-gray-700/50 border-none dark:text-muted-foreground text-gray-700 p-3 h-24 rounded-lg"
            {...register("text")}
          />
          <div className="flex justify-end space-x-2">
            <Button disabled={isPending} variant="outline" type="reset">
              Reset
            </Button>
            <Button disabled={isPending} type="submit">
              {isPending ? "Adding comment..." : "Add comment"}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};
