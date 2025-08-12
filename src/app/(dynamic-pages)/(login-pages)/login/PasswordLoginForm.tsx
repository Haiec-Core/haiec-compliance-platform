"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { AuthFormInput } from "@/components/auth-form-components/AuthFormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithPasswordSchema, SignInWithPasswordSchemaType } from "@/utils/zod-schemas/auth";
import { supabase } from "@/lib/supabaseClient";

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
  const [loading, setLoading] = useState(false);

  const form = useForm<SignInWithPasswordSchemaType>({
    resolver: zodResolver(signInWithPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
      next,
    },
  });

  const onSubmit = async (data: SignInWithPasswordSchemaType) => {
    setLoading(true);
    toastRef.current = toast.loading("Logging in...");
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message, { id: toastRef.current });
    } else {
      toast.success("Logged in!", { id: toastRef.current });
      redirectToDashboard();
      setRedirectInProgress(true);
    }
    toastRef.current = undefined;
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
          disabled={loading}
          data-testid="password-login-button"
        >
          {loading ? "Logging in..." : "Log in"}
        </Button>
      </form>
    </Form>
  );
}
