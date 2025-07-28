"use client";

import { useAction } from "next-safe-action/hooks";
import { useRef } from "react";
import { toast } from "sonner";

import { RenderProviders } from "@/components/Auth/RenderProviders";
import { signInWithProviderAction } from "@/data/auth/auth";
import type { AuthProvider } from "@/types";
import { getSafeActionErrorMessage } from "@/utils/errorMessage";

interface ProviderSignupFormProps {
  next?: string;
}

export function ProviderSignupForm({ next }: ProviderSignupFormProps) {
  const toastRef = useRef<string | number | undefined>(undefined);

  const { execute: executeProvider, status: providerStatus } = useAction(
    signInWithProviderAction,
    {
      onExecute: () => {
        toastRef.current = toast.loading("Requesting login...");
      },
      onSuccess: ({ data }) => {
        toast.success("Redirecting...", { id: toastRef.current });
        toastRef.current = undefined;
        if (data?.url) {
          window.location.href = data.url;
        }
      },
      onError: ({ error }) => {
        const errorMessage = getSafeActionErrorMessage(
          error,
          "Failed to login",
        );
        toast.error(errorMessage, { id: toastRef.current });
        toastRef.current = undefined;
      },
    },
  );

  return (
    <RenderProviders
      providers={["google", "github", "twitter"]}
      isLoading={providerStatus === "executing"}
      onProviderLoginRequested={(
        provider: Extract<AuthProvider, "google" | "github" | "twitter">,
      ) => executeProvider({ provider, next })}
    />
  );
}
