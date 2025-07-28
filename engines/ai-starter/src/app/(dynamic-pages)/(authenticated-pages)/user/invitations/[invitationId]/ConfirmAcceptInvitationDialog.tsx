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
import { acceptInvitationAction } from "@/data/user/invitation";
import { Check } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

export const ConfirmAcceptInvitationDialog = ({
  invitationId,
}: {
  invitationId: string;
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const toastRef = useRef<string | number | undefined>(undefined);

  const { execute: acceptInvitation, isPending: isAccepting } = useAction(
    acceptInvitationAction,
    {
      onExecute: () => {
        toastRef.current = toast.loading("Accepting invitation...");
      },
      onSuccess: ({ data }) => {
        if (data) {
          toast.success("Invitation accepted!", {
            id: toastRef.current,
          });
          toastRef.current = undefined;
          router.push(data);
        }
      },
      onError: ({ error }) => {
        const errorMessage = error.serverError ?? "Failed to accept invitation";
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
        <Button
          data-testid="dialog-accept-invitation-trigger"
          variant="default"
          size="default"
        >
          <Check className="mr-2 h-5 w-5" /> Accept Invitation
        </Button>
      </DialogTrigger>
      <DialogContent
        data-testid="dialog-accept-invitation-content"
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 rounded-lg">
            <Check className="w-6 h-6" />
          </div>
          <div className="p-1">
            <DialogTitle className="text-lg">Accept Invitation</DialogTitle>
            <DialogDescription className="text-base">
              Are you sure you want to accept this invitation?
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button
            type="button"
            disabled={isAccepting}
            variant="outline"
            className="w-full"
            data-testid="cancel"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            data-testid="confirm"
            disabled={isAccepting}
            variant="default"
            className="w-full"
            onClick={() => {
              acceptInvitation({ invitationId });
              setOpen(false);
            }}
          >
            {isAccepting ? "Accepting..." : "Accept"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
