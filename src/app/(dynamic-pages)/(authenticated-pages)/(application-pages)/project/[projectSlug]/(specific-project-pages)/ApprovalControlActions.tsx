"use client";

import { T } from "@/components/ui/Typography";
import {
  approveProjectAction,
  markProjectAsCompletedAction,
  rejectProjectAction,
  submitProjectForApprovalAction,
} from "@/data/user/projects";
import type { Enum } from "@/types";
import { useAction } from "next-safe-action/hooks";
import { useRef } from "react";
import { toast } from "sonner";
import { ConfirmApproveProjectDialog } from "./ConfirmApproveProjectDialog";
import { ConfirmMarkProjectAsCompleteDialog } from "./ConfirmMarkProjectAsCompleteDialog";
import { ConfirmRejectProjectDialog } from "./ConfirmRejectProjectDialog";
import { SubmitProjectForApprovalDialog } from "./SubmitProjectForApprovalDialog";

type ProjectStatus = Enum<"project_status">;

interface ApprovalControlActionsProps {
  projectId: string;
  projectSlug: string;
  canManage: boolean;
  canOnlyEdit: boolean;
  projectStatus: ProjectStatus;
}

export function ApprovalControlActions({
  projectId,
  projectSlug,
  canManage,
  canOnlyEdit,
  projectStatus,
}: ApprovalControlActionsProps) {
  const toastRef = useRef<string | number | undefined>(undefined);

  const { execute: submitProjectForApproval } = useAction(
    submitProjectForApprovalAction,
    {
      onExecute: () => {
        toastRef.current = toast.loading("Submitting project for approval...");
      },
      onSuccess: () => {
        toast.success("Project submitted for approval!", {
          id: toastRef.current,
        });
        toastRef.current = undefined;
      },
      onError: ({ error }) => {
        const errorMessage =
          error.serverError ?? "Failed to submit project for approval";
        toast.error(errorMessage, {
          id: toastRef.current,
        });
        toastRef.current = undefined;
      },
    },
  );

  const { execute: markProjectAsCompleted } = useAction(
    markProjectAsCompletedAction,
    {
      onExecute: () => {
        toastRef.current = toast.loading("Marking project as complete...");
      },
      onSuccess: () => {
        toast.success("Project marked as complete!", {
          id: toastRef.current,
        });
        toastRef.current = undefined;
      },
      onError: ({ error }) => {
        const errorMessage =
          error.serverError ?? "Failed to mark project as complete";
        toast.error(errorMessage, {
          id: toastRef.current,
        });
        toastRef.current = undefined;
      },
    },
  );

  const { execute: approveProject } = useAction(approveProjectAction, {
    onExecute: () => {
      toastRef.current = toast.loading("Approving project...");
    },
    onSuccess: () => {
      toast.success("Project approved!", {
        id: toastRef.current,
      });
      toastRef.current = undefined;
    },
    onError: ({ error }) => {
      const errorMessage = error.serverError ?? "Failed to approve project";
      toast.error(errorMessage, {
        id: toastRef.current,
      });
      toastRef.current = undefined;
    },
  });

  const { execute: rejectProject } = useAction(rejectProjectAction, {
    onExecute: () => {
      toastRef.current = toast.loading("Rejecting project...");
    },
    onSuccess: () => {
      toast.success("Project rejected!", {
        id: toastRef.current,
      });
      toastRef.current = undefined;
    },
    onError: ({ error }) => {
      const errorMessage = error.serverError ?? "Failed to reject project";
      toast.error(errorMessage, {
        id: toastRef.current,
      });
      toastRef.current = undefined;
    },
  });

  return (
    <>
      {projectStatus === "draft" ? (
        canManage ? (
          <ConfirmMarkProjectAsCompleteDialog
            onConfirm={() => markProjectAsCompleted({ projectId, projectSlug })}
          />
        ) : canOnlyEdit ? (
          <SubmitProjectForApprovalDialog
            onSubmit={() =>
              submitProjectForApproval({ projectId, projectSlug })
            }
          />
        ) : null
      ) : null}
      {!canManage && projectStatus === "pending_approval" ? (
        <T.P className="text-green-600 italic text-xs">Awaiting approval</T.P>
      ) : null}
      {canManage && projectStatus === "pending_approval" && (
        <>
          <ConfirmApproveProjectDialog
            onConfirm={() => approveProject({ projectId, projectSlug })}
          />
          <ConfirmRejectProjectDialog
            onConfirm={() => rejectProject({ projectId, projectSlug })}
          />
        </>
      )}
      {projectStatus === "approved" && canManage ? (
        <ConfirmMarkProjectAsCompleteDialog
          onConfirm={() => markProjectAsCompleted({ projectId, projectSlug })}
        />
      ) : null}
    </>
  );
}
