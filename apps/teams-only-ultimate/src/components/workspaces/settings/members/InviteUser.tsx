"use client";

import { createInvitationAction } from "@/data/user/invitation";
import type { Enum, WorkspaceWithMembershipType } from "@/types";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";
import { InviteWorkspaceMemberDialog } from "./InviteWorkspaceMemberDialog";

export function InviteUser({
  workspace,
}: {
  workspace: WorkspaceWithMembershipType;
}) {
  const toastRef = useRef<string | number | undefined>(undefined);
  const router = useRouter();
  const { execute, status } = useAction(createInvitationAction, {
    onExecute: () => {
      toastRef.current = toast.loading("Inviting user...");
    },
    onSuccess: () => {
      toast.success("User invited!", { id: toastRef.current });
      toastRef.current = undefined;
    },
    onError: ({ error }) => {
      const errorMessage = error.serverError || "Failed to invite user";
      toast.error(errorMessage, { id: toastRef.current });
      toastRef.current = undefined;
    },
  });

  const handleInvite = (
    email: string,
    role: Exclude<Enum<"workspace_member_role_type">, "owner">,
  ) => {
    execute({
      email,
      workspaceId: workspace.id,
      role,
    });
  };

  return (
    <InviteWorkspaceMemberDialog
      onInvite={handleInvite}
      isLoading={status === "executing"}
    />
  );
}
