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
import { declineInvitationAction } from "@/data/user/invitation";
import { X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRef, useState } from "react";
import { toast } from "sonner";

export const ConfirmDeclineInvitationDialog = ({
  invitationId,
}: {
  invitationId: string;
}) => {
  const [open, setOpen] = useState(false);
  const toastRef = useRef<string | number | undefined>(undefined);

  const { execute: declineInvitation, isPending: isDeclining } = useAction(
    declineInvitationAction,
    {
      onExecute: () => {
        toastRef.current = toast.loading("Declining invitation...");
      },
      onSuccess: () => {
        toast.success("Invitation declined!", {
          id: toastRef.current,
        });
        toastRef.current = undefined;
        setOpen(false);
      },
      onError: ({ error }) => {
        const errorMessage =
          error.serverError ?? "Failed to decline invitation";
        toast.error(errorMessage, {
          id: toastRef.current,
        });
        toastRef.current = undefined;
      },
    },
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button data-testid="decline" variant="outline" size="default">
          <X className="mr-2 h-5 w-5" /> Decline Invitation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 rounded-lg">
            <X className="w-6 h-6" />
          </div>
          <div className="p-1">
            <DialogTitle className="text-lg">Decline Invitation</DialogTitle>
            <DialogDescription className="text-base">
              Are you sure you want to decline this invitation?
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button
            type="button"
            disabled={isDeclining}
            variant="outline"
            className="w-full"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={isDeclining}
            variant="destructive"
            className="w-full"
            onClick={() => {
              declineInvitation({ invitationId });
              setOpen(false);
            }}
          >
            {isDeclining ? "Declining..." : "Decline"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
