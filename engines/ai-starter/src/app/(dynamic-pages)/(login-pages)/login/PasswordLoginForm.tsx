"use client";

import { getSafeActionErrorMessage } from "@/utils/errorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormActionErrorMapper } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useAction } from "next-safe-action/hooks";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AuthFormInput } from "@/components/auth-form-components/AuthFormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { signInWithPasswordAction } from "@/data/auth/auth";
import {
  signInWithPasswordSchema,
  SignInWithPasswordSchemaType,
} from "@/utils/zod-schemas/auth";

interface PasswordLoginFormProps {
  redirectToDashboard: () => void;
  setRedirectInProgress: (value: boolean) => void;
  next?: string;
}

export function PasswordLoginForm({
  redirectToDashboard,
  setRedirectInProgress,
  next,
}: PasswordLoginFormProps) {
  const toastRef = useRef<string | number | undefined>(undefined);

  const signInWithPasswordMutation = useAction(signInWithPasswordAction, {
    onExecute: () => {
      toastRef.current = toast.loading("Logging in...");
    },
    onSuccess: () => {
      toast.success("Logged in!", { id: toastRef.current });
      toastRef.current = undefined;
      redirectToDashboard();
      setRedirectInProgress(true);
    },
    onError: ({ error }) => {
      toast.error(getSafeActionErrorMessage(error, "Failed to log in"), {
        id: toastRef.current,
      });
      toastRef.current = undefined;
    },
  });

  const { hookFormValidationErrors } = useHookFormActionErrorMapper<
    typeof signInWithPasswordSchema
  >(signInWithPasswordMutation.result.validationErrors, { joinBy: "\n" });

  const { execute: executePassword, status: passwordStatus } =
    signInWithPasswordMutation;

  const form = useForm<SignInWithPasswordSchemaType>({
    resolver: zodResolver(signInWithPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
      next,
    },
    errors: hookFormValidationErrors,
  });

  const onSubmit = (data: SignInWithPasswordSchemaType) => {
    executePassword(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <AuthFormInput
          id="email"
          placeholder="Email"
          type="email"
          control={form.control}
          name="email"
          inputProps={{
            autoComplete: "email",
          }}
        />
        <AuthFormInput
          id="password"
          placeholder="Password"
          type="password"
          control={form.control}
          name="password"
          inputProps={{
            autoComplete: "current-password",
          }}
        />
        <Button
          className="w-full"
          type="submit"
          disabled={passwordStatus === "executing"}
          data-testid="password-login-button"
        >
          {passwordStatus === "executing" ? "Logging in..." : "Log in"}
        </Button>
      </form>
    </Form>
  );
}
