"use client";

import { Button } from "@/components/ui/button";
import { useCreateWorkspaceDialog } from "@/contexts/CreateWorkspaceDialogContext";
import { PlusIcon } from "@radix-ui/react-icons";

export function CreateWorkspaceButton({ onClick }: { onClick?: () => void }) {
  const { openDialog } = useCreateWorkspaceDialog();

  return (
    <Button
      onClick={() => {
        onClick?.();
        openDialog();
      }}
      size="sm"
      className="w-full"
    >
      <PlusIcon className="mr-2 h-4 w-4" />
      Create Team Workspace
    </Button>
  );
}
