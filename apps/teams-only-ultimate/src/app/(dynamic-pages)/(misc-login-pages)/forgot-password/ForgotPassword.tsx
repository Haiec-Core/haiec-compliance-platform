"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormActionErrorMapper } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useAction } from "next-safe-action/hooks";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { EmailConfirmationPendingCard } from "@/components/Auth/EmailConfirmationPendingCard";
import { FormInput } from "@/components/form-components/FormInput";
import { T } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { resetPasswordAction } from "@/data/auth/auth";
import { getSafeActionErrorMessage } from "@/utils/errorMessage";
import {
  resetPasswordSchema,
  ResetPasswordSchemaType,
} from "@/utils/zod-schemas/auth";
import Link from "next/link";

export function ForgotPassword() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const toastRef = useRef<string | number | undefined>(undefined);

  const resetPasswordMutation = useAction(resetPasswordAction, {
    onExecute: () => {
      toastRef.current = toast.loading("Sending password reset link...");
    },
    onSuccess: () => {
      toast.success("Password reset link sent!", {
        id: toastRef.current,
      });
      toastRef.current = undefined;
      setSuccessMessage("A password reset link has been sent to your email!");
    },
    onError: ({ error }) => {
      const errorMessage = getSafeActionErrorMessage(
        error,
        "Failed to send password reset link",
      );
      toast.error(errorMessage, {
        id: toastRef.current,
      });
      toastRef.current = undefined;
    },
  });

  const { hookFormValidationErrors } = useHookFormActionErrorMapper<
    typeof resetPasswordSchema
  >(resetPasswordMutation.result.validationErrors, { joinBy: "\n" });

  const { execute, status } = resetPasswordMutation;

  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
    errors: hookFormValidationErrors,
  });

  const onSubmit = (data: ResetPasswordSchemaType) => {
    execute(data);
  };

  return (
    <>
      {successMessage ? (
        <EmailConfirmationPendingCard
          message={successMessage}
          heading="Reset password link sent"
          type="reset-password"
          resetSuccessMessage={setSuccessMessage}
        />
      ) : (
        <Card className="container h-full grid items-center text-left max-w-lg mx-auto overflow-auto">
          <CardHeader>
            <T.H4>Forgot Password</T.H4>
            <T.P className="text-muted-foreground">
              Enter your email to receive a Magic Link to reset your password.
            </T.P>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormInput
                  id="forgot-password-email"
                  label="Email address"
                  type="email"
                  control={form.control}
                  name="email"
                  inputProps={{
                    placeholder: "placeholder@email.com",
                    disabled: status === "executing",
                    autoComplete: "email",
                  }}
                />
                <Button
                  className="w-full"
                  type="submit"
                  disabled={status === "executing"}
                >
                  {status === "executing" ? "Sending..." : "Reset password"}
                </Button>
                <div className="text-sm text-center">
                  <Link
                    href="/login"
                    className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
                  >
                    Log in instead?
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </>
  );
}
