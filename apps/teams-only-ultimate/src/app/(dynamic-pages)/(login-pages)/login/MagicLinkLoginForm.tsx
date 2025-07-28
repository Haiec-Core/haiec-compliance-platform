"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormActionErrorMapper } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useAction } from "next-safe-action/hooks";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AuthFormInput } from "@/components/auth-form-components/AuthFormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { signInWithMagicLinkAction } from "@/data/auth/auth";
import { getSafeActionErrorMessage } from "@/utils/errorMessage";
import {
  signInWithMagicLinkSchema,
  signInWithMagicLinkSchemaType,
} from "@/utils/zod-schemas/auth";

interface MagicLinkLoginFormProps {
  next?: string;
  setEmailSentSuccessMessage: (message: string) => void;
}

export function MagicLinkLoginForm({
  next,
  setEmailSentSuccessMessage,
}: MagicLinkLoginFormProps) {
  const toastRef = useRef<string | number | undefined>(undefined);

  const signInWithMagicLinkMutation = useAction(signInWithMagicLinkAction, {
    onExecute: () => {
      toastRef.current = toast.loading("Sending magic link...");
    },
    onSuccess: () => {
      toast.success("A magic link has been sent to your email!", {
        id: toastRef.current,
      });
      toastRef.current = undefined;
      setEmailSentSuccessMessage("A magic link has been sent to your email!");
    },
    onError: ({ error }) => {
      const errorMessage = getSafeActionErrorMessage(
        error,
        "Failed to send magic link",
      );
      toast.error(errorMessage, { id: toastRef.current });
      toastRef.current = undefined;
    },
  });

  const { hookFormValidationErrors } = useHookFormActionErrorMapper<
    typeof signInWithMagicLinkSchema
  >(signInWithMagicLinkMutation.result.validationErrors, { joinBy: "\n" });

  const { execute: executeMagicLink, status: magicLinkStatus } =
    signInWithMagicLinkMutation;

  const form = useForm<signInWithMagicLinkSchemaType>({
    resolver: zodResolver(signInWithMagicLinkSchema),
    defaultValues: {
      email: "",
      shouldCreateUser: true,
      next,
    },
    errors: hookFormValidationErrors,
  });

  const onSubmit = (data: signInWithMagicLinkSchemaType) => {
    executeMagicLink(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        data-testid="magic-link-form"
        data-status={magicLinkStatus}
      >
        <AuthFormInput
          id="magic-link-email"
          type="email"
          control={form.control}
          name="email"
          placeholder="Email"
          inputProps={{
            disabled: magicLinkStatus === "executing",
            autoComplete: "email",
          }}
        />
        <Button
          className="w-full"
          type="submit"
          disabled={magicLinkStatus === "executing"}
        >
          {magicLinkStatus === "executing" ? "Sending..." : "Send Magic Link"}
        </Button>
      </form>
    </Form>
  );
}
