// src/app/(dynamic-pages)/(authenticated-pages)/app_admin/(admin-pages)/marketing/authors/DeleteAuthorProfileDialog.tsx
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
import { deleteAuthorProfileAction } from "@/data/admin/marketing-authors";
import { Trash } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface DeleteAuthorProfileDialogProps {
  authorId: string;
  authorName: string;
}

export function DeleteAuthorProfileDialog({
  authorId,
  authorName,
}: DeleteAuthorProfileDialogProps) {
  const [open, setOpen] = useState(false);
  const toastRef = useRef<string | number | undefined>(undefined);
  const router = useRouter();

  const deleteProfileMutation = useAction(deleteAuthorProfileAction, {
    onExecute: () => {
      toastRef.current = toast.loading("Deleting profile...", {
        description: "Please wait while we delete the profile.",
      });
    },
    onSuccess: () => {
      toast.success("Profile deleted!", { id: toastRef.current });
      setOpen(false);
      router.push("/app_admin/marketing/authors");
      router.refresh();
    },
    onError: ({ error }) => {
      toast.error(
        `Failed to delete profile: ${error.serverError || "Unknown error"}`,
        { id: toastRef.current },
      );
    },
    onSettled: () => {
      toastRef.current = undefined;
    },
  });

  const handleDelete = () => {
    deleteProfileMutation.execute({ id: authorId });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Trash className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Author Profile</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the profile for {authorName}? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteProfileMutation.status === "executing"}
          >
            {deleteProfileMutation.status === "executing"
              ? "Deleting..."
              : "Delete"}
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
