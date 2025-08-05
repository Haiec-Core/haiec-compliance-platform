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
import { deleteChangelogAction } from "@/data/admin/marketing-changelog";
import { Trash2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

type DeleteChangelogDialogProps = {
  changelogId: string;
  changelogTitle: string;
};

export const DeleteChangelogDialog: React.FC<DeleteChangelogDialogProps> = ({
  changelogId,
  changelogTitle,
}) => {
  const [open, setOpen] = useState(false);
  const toastRef = useRef<string | number | undefined>(undefined);
  const router = useRouter();

  const deleteChangelogMutation = useAction(deleteChangelogAction, {
    onExecute: () => {
      toastRef.current = toast.loading("Deleting changelog...", {
        description: "Please wait while we delete the changelog.",
      });
    },
    onSuccess: () => {
      toast.success("Changelog deleted successfully", { id: toastRef.current });
      toastRef.current = undefined;
      setOpen(false);
      router.refresh();
    },
    onError: ({ error }) => {
      toast.error(
        `Failed to delete changelog: ${error.serverError || "Unknown error"}`,
        { id: toastRef.current },
      );
      toastRef.current = undefined;
    },
    onSettled: () => {
      toastRef.current = undefined;
    },
  });

  const handleDelete = () => {
    deleteChangelogMutation.execute({ id: changelogId });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          data-testid="delete-changelog-dialog-trigger"
          variant="outline"
          size="sm"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Changelog</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the changelog &quot;
            {changelogTitle}&quot;? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            data-testid="confirm-delete-button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteChangelogMutation.status === "executing"}
          >
            {deleteChangelogMutation.status === "executing"
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
};
