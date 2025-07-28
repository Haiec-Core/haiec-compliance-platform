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
import { sendLoginLinkAction } from "@/data/admin/user";
import { Send } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRef, useState } from "react";
import { toast } from "sonner";

export const ConfirmSendLoginLinkDialog = ({
  userEmail,
}: {
  userEmail: string;
}) => {
  const [open, setOpen] = useState(false);
  const toastRef = useRef<string | number | undefined>(undefined);

  const { execute: sendLoginLink, isPending: isSending } = useAction(
    sendLoginLinkAction,
    {
      onExecute: () => {
        toastRef.current = toast.loading("Sending login link...");
      },
      onSuccess: () => {
        toast.success("Login link sent!", {
          id: toastRef.current,
        });
        toastRef.current = undefined;
        setOpen(false);
      },
      onError: ({ error }) => {
        const errorMessage = error.serverError ?? "Failed to send login link";
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
        <Button variant={"ghost"} aria-disabled={isSending}>
          Send login link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 mb-2 rounded-lg">
            <Send className=" w-6 h-6" />
          </div>
          <div className="p-1">
            <DialogTitle className="text-lg">Send Login Link</DialogTitle>
            <DialogDescription className="text-base mt-0">
              Are you sure you want to send a login link to the user?
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="mt-2">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            aria-disabled={isSending}
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="default"
            className="w-full"
            aria-disabled={isSending}
            onClick={() => {
              sendLoginLink({ email: userEmail });
            }}
          >
            Send Login Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
