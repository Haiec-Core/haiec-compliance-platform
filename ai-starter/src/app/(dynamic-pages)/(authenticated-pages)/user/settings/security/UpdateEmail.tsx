// src/app/(dynamic-pages)/(authenticated-pages)/user/settings/security/UpdateEmail.tsx

"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { updateEmailAction } from "@/data/user/security";
import { classNames } from "@/utils/classNames";
import { useAction } from "next-safe-action/hooks";
import { useRef } from "react";
import { useInput } from "rooks";
import { toast } from "sonner";

export const UpdateEmail = ({
  initialEmail,
}: {
  initialEmail?: string | undefined;
}) => {
  const emailInput = useInput(initialEmail ?? "");
  const toastRef = useRef<string | number | undefined>(undefined);

  const { execute: updateEmail, isPending } = useAction(updateEmailAction, {
    onExecute: () => {
      toastRef.current = toast.loading("Updating email...");
    },
    onSuccess: () => {
      toast.success("Email updated!", {
        id: toastRef.current,
      });
      toastRef.current = undefined;
    },
    onError: ({ error }) => {
      const errorMessage = error.serverError ?? "Failed to update email";
      toast.error(errorMessage, {
        id: toastRef.current,
      });
      toastRef.current = undefined;
    },
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-muted-foreground">
          Email
        </Label>
        <div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            {...emailInput}
            className="block w-full appearance-none rounded-md border bg-gray-50/10 dark:bg-gray-800/20 h-10 px-3 py-3 placeholder-muted-foreground shadow-xs focus:border-blue-500 focus:outline-hidden focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <Button
          aria-disabled={isPending}
          type="button"
          onClick={() => {
            updateEmail({ email: emailInput.value });
          }}
          className={classNames(
            "flex w-full justify-center rounded-lg border border-transparent py-3 text-white dark:text-black px-4 text-sm font-medium shadow-xs focus:outline-hidden focus:ring-2 focus:ring-offset-2",
            isPending
              ? "bg-yellow-300 dark:bg-yellow-700"
              : "bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100",
          )}
        >
          {isPending ? "Updating..." : "Update Email"}
        </Button>
      </div>
    </div>
  );
};
