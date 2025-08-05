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
import { appAdminGetUserImpersonationUrlAction } from "@/data/admin/user";
import { Link } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRef, useState } from "react";
import { toast } from "sonner";

export const GetLoginLinkDialog = ({ userId }: { userId: string }) => {
  const [open, setOpen] = useState(false);
  const toastRef = useRef<string | number | undefined>(undefined);

  const { execute: getLoginLink, isPending } = useAction(
    appAdminGetUserImpersonationUrlAction,
    {
      onExecute: () => {
        toastRef.current = toast.loading("Generating login link...");
      },
      onSuccess: ({ data }) => {
        if (data) {
          navigator.clipboard.writeText(data);
          toast.success("Login link copied to clipboard!", {
            id: toastRef.current,
          });
          toastRef.current = undefined;
        } else {
          throw new Error("Failed to generate login link");
        }
      },
      onError: ({ error }) => {
        const errorMessage =
          error.serverError ?? "Failed to generate login link";
        toast.error(errorMessage, {
          id: toastRef.current,
        });
        toastRef.current = undefined;
      },
    },
  );

  const handleGetLoginLink = () => {
    getLoginLink({ userId });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" disabled={isPending}>
          Get login link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 mb-2 rounded-lg">
            <Link className="w-6 h-6" />
          </div>
          <div className="p-1">
            <DialogTitle className="text-lg">Get Login Link</DialogTitle>
            <DialogDescription className="text-base mt-0">
              Are you sure you want to generate a login link for the user?
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="mt-2">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={isPending}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="default"
            className="w-full"
            onClick={handleGetLoginLink}
            disabled={isPending}
          >
            Get Login Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
