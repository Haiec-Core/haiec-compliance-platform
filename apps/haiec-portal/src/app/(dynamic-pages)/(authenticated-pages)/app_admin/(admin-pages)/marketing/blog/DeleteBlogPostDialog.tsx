// @/app/(dynamic-pages)/(authenticated-pages)/app_admin/(admin-pages)/marketing/blog/DeleteBlogPostDialog.tsx
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteBlogPostAction } from "@/data/admin/marketing-blog";
import { Trash2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

type DeleteBlogPostDialogProps = {
  postId: string;
  postTitle: string;
};

export const DeleteBlogPostDialog: React.FC<DeleteBlogPostDialogProps> = ({
  postId,
  postTitle,
}) => {
  const [open, setOpen] = useState(false);
  const toastRef = useRef<string | number | undefined>(undefined);
  const router = useRouter();

  const deleteMutation = useAction(deleteBlogPostAction, {
    onExecute: () => {
      toastRef.current = toast.loading("Deleting blog post...", {
        description: "Please wait while we delete the post.",
      });
    },
    onSuccess: () => {
      toast.success("Blog post deleted successfully", { id: toastRef.current });
      toastRef.current = undefined;
      setOpen(false);
      router.refresh();
    },
    onError: ({ error }) => {
      toast.error(
        `Failed to delete blog post: ${error.serverError || "Unknown error"}`,
        { id: toastRef.current },
      );
      toastRef.current = undefined;
    },
    onSettled: () => {
      toastRef.current = undefined;
    },
  });

  const handleDelete = () => {
    deleteMutation.execute({ id: postId });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          data-testid="delete-blog-post-dialog-trigger"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Blog Post</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the blog post &quot;
            {postTitle}&quot;? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.status === "executing"}
            data-testid="confirm-delete-button"
          >
            {deleteMutation.status === "executing" ? "Deleting..." : "Delete"}
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
