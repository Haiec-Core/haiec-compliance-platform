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
import { revokeUnkeyTokenAction } from "@/data/user/unkey";
import { useAction } from "next-safe-action/hooks";
import { useRef, useState } from "react";
import { toast } from "sonner";

type Props = {
  keyId: string;
};

export const ConfirmRevokeTokenDialog = ({ keyId }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const toastRef = useRef<string | number | undefined>(undefined);

  const { execute, status } = useAction(revokeUnkeyTokenAction, {
    onExecute: () => {
      toastRef.current = toast.loading("Revoking API Key...");
    },
    onSuccess: () => {
      toast.success("API Key revoked!", { id: toastRef.current });
      toastRef.current = undefined;
      setOpen(false);
    },
    onError: ({ error }) => {
      console.log(error);
      const errorMessage = error.serverError ?? "Failed to revoke API Key";
      toast.error(errorMessage, { id: toastRef.current });
      toastRef.current = undefined;
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    execute({ keyId });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Revoke</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] [&>.dialog-close]:hidden">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Revoke Token</DialogTitle>
            <DialogDescription>
              Are you sure you want to revoke this token? This action is
              irreversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <input type="hidden" name="keyId" value={keyId} />
            <Button
              variant="destructive"
              type="submit"
              disabled={status === "executing"}
            >
              {status === "executing" ? "Revoking API Key..." : "Yes, revoke"}
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
