"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updatePasswordAction } from "@/data/user/security";
import { cn } from "@/utils/cn";

const updatePasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;

export const UpdatePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const toastRef = useRef<string | number | undefined>(undefined);

  const { execute: updatePassword, status } = useAction(updatePasswordAction, {
    onExecute: () => {
      toastRef.current = toast.loading("Updating password...");
    },
    onSuccess: () => {
      toast.success("Password updated!", { id: toastRef.current });
      toastRef.current = undefined;
    },
    onError: ({ error }) => {
      const errorMessage = error.serverError ?? "Update password failed";
      toast.error(errorMessage, { id: toastRef.current });
      toastRef.current = undefined;
    },
  });

  const onSubmit = (data: UpdatePasswordFormData) => {
    updatePassword(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password" className="text-muted-foreground">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          {...register("password")}
          className={cn(
            "w-full rounded-md border bg-gray-50/10 dark:bg-gray-800/20 h-10 px-3 py-3 placeholder-muted-foreground shadow-xs focus:border-blue-500 focus:outline-hidden focus:ring-blue-500 sm:text-sm",
            errors.password && "border-red-500",
          )}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>
      <Button
        type="submit"
        disabled={!isValid || status === "executing"}
        className={cn(
          "flex w-full justify-center rounded-lg border border-transparent py-3 text-white dark:text-black px-4 text-sm font-medium shadow-xs focus:outline-hidden focus:ring-2 focus:ring-offset-2",
          status === "executing"
            ? "bg-yellow-300 dark:bg-yellow-700"
            : "bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100",
        )}
      >
        {status === "executing" ? "Updating..." : "Update Password"}
      </Button>
    </form>
  );
};
