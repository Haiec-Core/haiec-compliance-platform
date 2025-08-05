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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUserAction } from "@/data/admin/user";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { Plus } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useInput } from "rooks";
import { toast } from "sonner";
import { z } from "zod";

export const AppAdminCreateUserDialog = () => {
  const emailInput = useInput("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const toastRef = useRef<string | number | undefined>(undefined);

  const { execute: createUser, isPending: isCreatingUser } = useAction(
    createUserAction,
    {
      onExecute: () => {
        toastRef.current = toast.loading("Creating user...");
      },
      onSuccess: () => {
        toast.success("User created!", {
          id: toastRef.current,
        });
        toastRef.current = undefined;
        setOpen(false);
        router.refresh();
      },
      onError: ({ error }) => {
        const errorMessage = error.serverError ?? "Failed to create user";
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
        <Button variant="default">
          <Plus className="mr-2" /> Create User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 rounded-lg">
            <Plus className="w-6 h-6" />
          </div>
          <div className="p-1">
            <DialogTitle className="text-lg">Create User</DialogTitle>
            <DialogDescription className="text-base">
              Create a new user by entering their email address.
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="grid gap-4">
          <Label className="space-y-2">
            <span>Email</span>
            <Input type="email" name="email" {...emailInput} />
          </Label>
        </div>
        <DialogFooter className="mt-8">
          <Button
            onClick={() => {
              try {
                const validEmail = z.string().email().parse(emailInput.value);
                createUser({ email: validEmail });
              } catch (error) {
                const message = getErrorMessage(error);
                toast.error(message);
              }
            }}
            aria-disabled={isCreatingUser}
            type="button"
            className="w-full"
          >
            {isCreatingUser ? "Loading..." : "Create User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
