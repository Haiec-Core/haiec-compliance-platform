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
import { deleteTagAction } from "@/data/admin/marketing-tags";
import { Trash2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

type DeleteTagDialogProps = {
  tagId: string;
  tagName: string;
};

export const DeleteTagDialog: React.FC<DeleteTagDialogProps> = ({
  tagId,
  tagName,
}) => {
  const [open, setOpen] = useState(false);
  const toastRef = useRef<string | number | undefined>(undefined);
  const router = useRouter();

  const deleteTagMutation = useAction(deleteTagAction, {
    onExecute: () => {
      toastRef.current = toast.loading("Deleting tag...", {
        description: "Please wait while we delete the tag.",
      });
    },
    onSuccess: () => {
      toast.success("Tag deleted successfully", { id: toastRef.current });
      toastRef.current = undefined;
      setOpen(false);
      router.refresh();
    },
    onError: ({ error }) => {
      toast.error(
        `Failed to delete tag: ${error.serverError || "Unknown error"}`,
        { id: toastRef.current },
      );
      toastRef.current = undefined;
    },
    onSettled: () => {
      toastRef.current = undefined;
    },
  });

  const handleDelete = () => {
    deleteTagMutation.execute({ id: tagId });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Tag</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the tag &quot;{tagName}?&quot; This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteTagMutation.status === "executing"}
          >
            {deleteTagMutation.status === "executing"
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
