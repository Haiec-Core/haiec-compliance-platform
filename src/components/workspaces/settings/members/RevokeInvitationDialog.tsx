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
import { revokeInvitationAction } from "@/data/user/invitation";
import { Trash } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRef, useState } from "react";
import { toast } from "sonner";

type Props = {
  invitationId: string;
};

export const RevokeInvitationDialog = ({ invitationId }: Props) => {
  const [open, setOpen] = useState(false);
  const toastRef = useRef<string | number | undefined>(undefined);
  const { execute: revokeInvitation, isPending: isRevoking } = useAction(
    revokeInvitationAction,
    {
      onExecute: () => {
        toastRef.current = toast.loading("Revoking Invitation...");
      },
      onSuccess: () => {
        toast.success("Invitation revoked!", {
          id: toastRef.current,
        });
        toastRef.current = undefined;
        setOpen(false);
      },
      onError: ({ error }) => {
        const errorMessage = error.serverError ?? "Failed to revoke invitation";
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
        <Button variant="outline" size="icon">
          <Trash className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] [&>.dialog-close]:hidden">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            revokeInvitation({ invitationId });
          }}
        >
          <DialogHeader>
            <DialogTitle>Revoke Invitation</DialogTitle>
            <DialogDescription>
              Are you sure you want to revoke this invitation? This action is
              irreversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <input type="hidden" name="invitationId" value={invitationId} />
            <Button
              variant="destructive"
              type="submit"
              aria-disabled={isRevoking}
            >
              {isRevoking ? "Revoking Invitation..." : "Yes, revoke"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
