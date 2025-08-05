"use client";

import { Button } from "@/components/ui/button";
import { setDefaultWorkspaceAction } from "@/data/user/workspaces";
import { useAction } from "next-safe-action/hooks";
import { useRef } from "react";
import { toast } from "sonner";

interface SetDefaultWorkspaceButtonProps {
  workspaceId: string;
}

export function SetDefaultWorkspaceButton({
  workspaceId,
}: SetDefaultWorkspaceButtonProps) {
  const toastRef = useRef<string | number | undefined>(undefined);

  const { execute, status } = useAction(setDefaultWorkspaceAction, {
    onExecute: () => {
      toastRef.current = toast.loading("Setting as default workspace...");
    },
    onSuccess: () => {
      toast.success("Workspace set as default!", { id: toastRef.current });
      toastRef.current = undefined;
    },
    onError: ({ error }) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : (error.serverError ?? "Failed to set as default workspace");
      toast.error(errorMessage, { id: toastRef.current });
      toastRef.current = undefined;
    },
  });

  const handleSetDefault = () => {
    execute({ workspaceId });
  };

  return (
    <Button aria-disabled={status === "executing"} onClick={handleSetDefault}>
      {status === "executing" ? "Updating..." : "Set as default"}
    </Button>
  );
}
