"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { UserRole } from "@/types/userTypes";
import {
  NEW_PRIORITY_OPTIONS,
  NEW_STATUS_OPTIONS,
  NEW_TYPE_OPTIONS,
} from "@/utils/feedback";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import {
  ArrowDown,
  ArrowUpRight,
  EyeIcon,
  EyeOffIcon,
  MessageSquare,
  MessageSquareOff,
  Tags,
  VolumeX,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRef } from "react";
import { toast } from "sonner";

import {
  adminToggleFeedbackFromRoadmapAction,
  adminToggleFeedbackOpenForCommentsAction,
  adminToggleFeedbackVisibilityAction,
  adminUpdateFeedbackPriorityAction,
  adminUpdateFeedbackStatusAction,
  adminUpdateFeedbackTypeAction,
} from "@/data/feedback";
import type { DBTable } from "@/types";
import { userRoles } from "@/utils/userTypes";

export function FeedbackActionsDropdown({
  feedback,
  userRole,
}: {
  feedback: DBTable<"marketing_feedback_threads">;
  userRole: UserRole;
}) {
  const toastRef = useRef<string | number | undefined>(undefined);

  const { execute: updateFeedbackStatus } = useAction(
    adminUpdateFeedbackStatusAction,
    {
      onExecute: ({ input }) => {
        toastRef.current = toast.loading(
          `Updating status to ${input.status}...`,
        );
      },
      onSuccess: ({ data, input }) => {
        toast.success(`Status has been updated to ${input.status}`, {
          id: toastRef.current,
        });
        toastRef.current = undefined;
      },
      onError: ({ error }) => {
        const errorMessage = error.serverError ?? "Failed to update status";
        toast.error(errorMessage, { id: toastRef.current });
        toastRef.current = undefined;
      },
    },
  );

  const { execute: updateFeedbackType } = useAction(
    adminUpdateFeedbackTypeAction,
    {
      onExecute: ({ input }) => {
        toastRef.current = toast.loading(`Updating type to ${input.type}...`);
      },
      onSuccess: ({ data, input }) => {
        toast.success(`Type has been updated to ${input.type}`, {
          id: toastRef.current,
        });
        toastRef.current = undefined;
      },
      onError: ({ error }) => {
        const errorMessage = error.serverError ?? "Failed to update type";
        toast.error(errorMessage, { id: toastRef.current });
        toastRef.current = undefined;
      },
    },
  );

  const { execute: updateFeedbackPriority } = useAction(
    adminUpdateFeedbackPriorityAction,
    {
      onExecute: ({ input }) => {
        toastRef.current = toast.loading(
          `Updating priority to ${input.priority}...`,
        );
      },
      onSuccess: ({ data, input }) => {
        toast.success(`Priority has been updated to ${input.priority}`, {
          id: toastRef.current,
        });
        toastRef.current = undefined;
      },
      onError: ({ error }) => {
        const errorMessage = error.serverError ?? "Failed to update priority";
        toast.error(errorMessage, { id: toastRef.current });
        toastRef.current = undefined;
      },
    },
  );

  const { execute: updateRoadmap } = useAction(
    adminToggleFeedbackFromRoadmapAction,
    {
      onExecute: ({ input }) => {
        toastRef.current = toast.loading(
          input.isInRoadmap
            ? "Adding to roadmap..."
            : "Removing from roadmap...",
        );
      },
      onSuccess: ({ data, input }) => {
        toast.success(
          input.isInRoadmap ? "Added to roadmap" : "Removed from roadmap",
          { id: toastRef.current },
        );
        toastRef.current = undefined;
      },
      onError: ({ error }) => {
        const errorMessage =
          error.serverError ?? "Failed to update roadmap status";
        toast.error(errorMessage, { id: toastRef.current });
        toastRef.current = undefined;
      },
    },
  );

  const { execute: updateOpenForComments } = useAction(
    adminToggleFeedbackOpenForCommentsAction,
    {
      onExecute: ({ input }) => {
        toastRef.current = toast.loading(
          input.isOpenForComments
            ? "Opening thread for comments..."
            : "Closing thread for comments...",
        );
      },
      onSuccess: ({ data, input }) => {
        toast.success(
          input.isOpenForComments
            ? "Thread is now open for comments"
            : "Thread is now closed for comments",
          { id: toastRef.current },
        );
        toastRef.current = undefined;
      },
      onError: ({ error }) => {
        const errorMessage =
          error.serverError ?? "Failed to update open for comments status";
        toast.error(errorMessage, { id: toastRef.current });
        toastRef.current = undefined;
      },
    },
  );

  const { execute: updateVisibility } = useAction(
    adminToggleFeedbackVisibilityAction,
    {
      onExecute: ({ input }) => {
        toastRef.current = toast.loading(
          input.isPubliclyVisible
            ? "Showing thread to public..."
            : "Hiding thread from public...",
        );
      },
      onSuccess: ({ data, input }) => {
        toast.success(
          input.isPubliclyVisible
            ? "Thread is now publicly visible"
            : "Thread is now hidden from public",
          { id: toastRef.current },
        );
        toastRef.current = undefined;
      },
      onError: ({ error }) => {
        const errorMessage = error.serverError ?? "Failed to update visibility";
        toast.error(errorMessage, { id: toastRef.current });
        toastRef.current = undefined;
      },
    },
  );

  if (userRole === userRoles.ANON) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          data-testid="feedback-actions-dropdown-button"
        >
          <DotsVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {userRole === userRoles.ADMIN && (
          <>
            <DropdownMenuLabel>Manage Filters</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Tags className="h-4 w-4 mr-2" />
                  Apply status
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent data-testid="apply-status-dropdown-menu">
                    {NEW_STATUS_OPTIONS.map((status) => (
                      <DropdownMenuItem
                        key={status.label}
                        onClick={() => {
                          updateFeedbackStatus({
                            feedbackId: feedback.id,
                            status: status.value,
                          });
                        }}
                      >
                        <status.icon className="h-4 w-4 mr-2" /> {status.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Tags className="h-4 w-4 mr-2" />
                  Apply type
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent data-testid="apply-type-dropdown-menu">
                    {NEW_TYPE_OPTIONS?.map((type) => (
                      <DropdownMenuItem
                        key={type.label}
                        onClick={() => {
                          updateFeedbackType({
                            feedbackId: feedback.id,
                            type: type.value,
                          });
                        }}
                      >
                        <type.icon className="h-4 w-4 mr-2" /> {type.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Tags className="h-4 w-4 mr-2" />
                  Apply priority
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent data-testid="apply-priority-dropdown-menu">
                    {NEW_PRIORITY_OPTIONS?.map((priority) => (
                      <DropdownMenuItem
                        key={priority.label}
                        onClick={() => {
                          updateFeedbackPriority({
                            feedbackId: feedback.id,
                            priority: priority.value,
                          });
                        }}
                      >
                        <priority.icon className="h-4 w-4 mr-2" />
                        {priority.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        )}
        {(userRole === userRoles.ADMIN || userRole === userRoles.USER) && (
          <>
            <DropdownMenuLabel>Thread Settings</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <VolumeX className="h-4 w-4 mr-2" /> Mute this thread
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
        {userRole === userRoles.ADMIN && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Admin Settings</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                updateRoadmap({
                  feedbackId: feedback.id,
                  isInRoadmap: !feedback?.added_to_roadmap,
                });
              }}
            >
              {feedback?.added_to_roadmap ? (
                <>
                  <ArrowDown className="h-4 w-4 mr-2" />
                  Remove from roadmap
                </>
              ) : (
                <>
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  Add to roadmap
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                updateOpenForComments({
                  feedbackId: feedback.id,
                  isOpenForComments: !feedback?.open_for_public_discussion,
                });
              }}
            >
              {feedback?.open_for_public_discussion ? (
                <>
                  <MessageSquareOff className="h-4 w-4 mr-2" /> Close for
                  comments
                </>
              ) : (
                <>
                  <MessageSquare
                    className="h-4 w-4 mr-2"
                    data-testid="open-for-comments-button"
                  />
                  Open for comments
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              data-testid="toggle-visibility-dropdown-menu-item"
              onClick={() => {
                updateVisibility({
                  feedbackId: feedback.id,
                  isPubliclyVisible: !feedback?.is_publicly_visible,
                });
              }}
            >
              {feedback?.is_publicly_visible ? (
                <>
                  <EyeOffIcon className="h-4 w-4 mr-2" /> Make this thread
                  private
                </>
              ) : (
                <>
                  <EyeIcon
                    className="h-4 w-4 mr-2"
                    data-testid="show-thread-button"
                  />{" "}
                  Make this thread public
                </>
              )}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
