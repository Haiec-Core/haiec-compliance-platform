"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteProjectsAction } from "@/data/user/projects";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

interface ConfirmDeleteProjectsDialogProps {
  selectedCount: number;
  projectIds: string[];
  onSuccess: () => void;
}

export function ConfirmDeleteProjectsDialog({
  selectedCount,
  projectIds,
  onSuccess,
}: ConfirmDeleteProjectsDialogProps) {
  const queryClient = useQueryClient();

  const { execute: executeDelete, status } = useAction(deleteProjectsAction, {
    onSuccess: () => {
      toast.success("Projects deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      onSuccess();
    },
    onError: (error) => {
      toast.error(error.error?.serverError || "Failed to delete projects");
    },
  });

  const isDeleting = status === "executing";

  return (
    <AlertDialog>
      <Button variant="destructive" size="sm" disabled={isDeleting} asChild>
        <AlertDialogTrigger className="flex items-center">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Selected
        </AlertDialogTrigger>
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Delete Projects</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure? This action cannot be undone. This will permanently
            delete {selectedCount} selected project(s) and all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No, cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => executeDelete({ projectIds })}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Yes, I am sure. Delete them."}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
