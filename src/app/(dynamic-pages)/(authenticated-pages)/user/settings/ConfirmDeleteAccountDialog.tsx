"use client";

import { T } from "@/components/ui/Typography";
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
import { Input } from "@/components/ui/input";
import { requestAccountDeletionAction } from "@/data/user/user";
import { Trash } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ConfirmDeletionViaEmailDialog } from "./ConfirmDeletionViaEmailDialog";

export const ConfirmDeleteAccountDialog = () => {
  const [open, setOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const isDisabled = confirmText !== "delete";
  const toastRef = useRef<string | number | undefined>(undefined);

  const {
    execute: requestAccountDeletion,
    isPending: isRequestingAccountDeletion,
  } = useAction(requestAccountDeletionAction, {
    onExecute: () => {
      toastRef.current = toast.loading("Creating deletion request...");
    },
    onSuccess: () => {
      toast.success(
        "Account deletion request created. Please check your email.",
        {
          id: toastRef.current,
        },
      );
      toastRef.current = undefined;
      setIsSuccessDialogOpen(true);
    },
    onError: ({ error }) => {
      const errorMessage = error.serverError ?? "Failed!";
      toast.error(errorMessage, {
        id: toastRef.current,
      });
      toastRef.current = undefined;
    },
  });

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full" variant="destructive">
            <Trash className="mr-2 h-5 w-5" /> Delete Account
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your account? This action is
              irreversible. All your data will be lost.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="mt-4"
            />
            <T.Subtle className="pl-2">
              Type &quot;delete&quot; into the input to confirm.
            </T.Subtle>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              disabled={isDisabled || isRequestingAccountDeletion}
              variant="destructive"
              onClick={() => {
                requestAccountDeletion();
                setOpen(false);
              }}
            >
              {isRequestingAccountDeletion ? "Deleting..." : "Delete"} Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ConfirmDeletionViaEmailDialog
        open={isSuccessDialogOpen}
        setOpen={setIsSuccessDialogOpen}
      />
    </>
  );
};
