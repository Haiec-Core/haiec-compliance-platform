"use client";

import { createWorkspaceCheckoutSession } from "@/data/user/billing";
import { useAction } from "next-safe-action/hooks";
import { useRef } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface SubscriptionSelectProps {
  workspaceId: string;
  priceId: string;
  isOneTimePurchase?: boolean;
}

export function SubscriptionSelect({
  workspaceId,
  priceId,
  isOneTimePurchase = false,
}: SubscriptionSelectProps) {
  const toastRef = useRef<string | number | undefined>(undefined);

  const { execute: createCheckoutSession } = useAction(
    createWorkspaceCheckoutSession,
    {
      onExecute: () => {
        toastRef.current = toast.loading("Redirecting to checkout...");
      },
      onSuccess: ({ data }) => {
        if (data) {
          window.location.href = data.url;
        }
      },
      onError: ({ error }) => {
        const errorMessage =
          error.serverError ?? "Failed to create checkout session";
        toast.error(errorMessage, {
          id: toastRef.current,
        });
        toastRef.current = undefined;
      },
    },
  );

  return (
    <Button
      className="w-full"
      onClick={() => createCheckoutSession({ workspaceId, priceId })}
    >
      {isOneTimePurchase ? "Purchase" : "Select Plan"}
    </Button>
  );
}
