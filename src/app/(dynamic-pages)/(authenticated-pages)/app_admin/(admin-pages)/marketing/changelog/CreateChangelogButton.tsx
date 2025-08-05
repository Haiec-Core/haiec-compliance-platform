"use client";

import { Button } from "@/components/ui/button";
import { createChangelogAction } from "@/data/admin/marketing-changelog";
import { Plus } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { toast } from "sonner";

export const CreateChangelogButton: React.FC = () => {
  const toastRef = useRef<string | number | undefined>(undefined);
  const router = useRouter();

  const createChangelogMutation = useAction(createChangelogAction, {
    onExecute: () => {
      toastRef.current = toast.loading("Creating changelog...", {
        description: "Please wait while we create the changelog.",
      });
    },
    onSuccess: ({ data }) => {
      toast.success("Changelog created!", {
        id: toastRef.current,
        description: "Redirecting to the changelog...",
      });
      if (data) {
        router.push(`/app_admin/marketing/changelog/${data.id}`);
      }
    },
    onError: ({ error }) => {
      toast.error(
        `Failed to create changelog: ${error.serverError || "Unknown error"}`,
        {
          id: toastRef.current,
          description: "Please try again.",
        },
      );
    },
    onSettled: () => {
      toastRef.current = undefined;
    },
  });

  const handleCreateChangelog = () => {
    createChangelogMutation.execute({
      title: "New Changelog",
      stringified_json_content: JSON.stringify({}),
      status: "draft",
    });
  };

  return (
    <Button
      onClick={handleCreateChangelog}
      disabled={createChangelogMutation.status === "executing"}
    >
      <Plus className="mr-2 h-4 w-4" />
      {createChangelogMutation.status === "executing"
        ? "Creating..."
        : "Create Changelog"}
    </Button>
  );
};
