"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { AuthFormInput } from "@/components/auth-form-components/AuthFormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signInWithMagicLinkSchema,
  signInWithMagicLinkSchemaType,
} from "@/utils/zod-schemas/auth";
import { supabase } from "@/lib/supabaseClient";

interface MagicLinkLoginFormProps {
  next?: string;
  setEmailSentSuccessMessage: (message: string) => void;
}

export function MagicLinkLoginForm({
  next,
  setEmailSentSuccessMessage,
}: MagicLinkLoginFormProps) {
  const toastRef = useRef<string | number | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  // ✅ Explicitly matching the schema type + casting resolver to avoid TS mismatch
  const form = useForm<signInWithMagicLinkSchemaType>({
    resolver: zodResolver(signInWithMagicLinkSchema) as any,
    defaultValues: {
      email: "",
      shouldCreateUser: true, // Required boolean present
      next: next ?? null,
    },
  });

  const onSubmit = async (data: signInWithMagicLinkSchemaType) => {
    setLoading(true);
    toastRef.current = toast.loading("Sending magic link...");
    const { error } = await supabase.auth.signInWithOtp({
      email: data.email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${next || ""}`,
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message, { id: toastRef.current });
    } else {
      toast.success("Magic link sent!", { id: toastRef.current });
      setEmailSentSuccessMessage(`A magic link has been sent to ${data.email}`);
    }
    toastRef.current = undefined;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        data-testid="magic-link-form"
      >
        <AuthFormInput
          id="magic-link-email"
          type="email"
          control={form.control}
          name="email"
          placeholder="Email"
          inputProps={{
            disabled: loading,
            autoComplete: "email",
          }}
        />
        <Button
          className="w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Magic Link"}
        </Button>
      </form>
    </Form>
  );
}
