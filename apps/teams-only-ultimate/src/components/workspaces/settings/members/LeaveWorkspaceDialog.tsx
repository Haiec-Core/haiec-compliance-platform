"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { leaveWorkspaceAction } from "@/data/user/workspaces";
import { LogOut } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRef, useState } from "react";
import { toast } from "sonner";

export type LeaveWorkspaceConditions = "DISABLED_IS_LAST_ADMIN" | "ENABLED";

type Props = {
  workspaceId: string;
  memberId: string;
  leaveConditions: LeaveWorkspaceConditions;
};

export const LeaveWorkspaceDialog = ({
  workspaceId,
  memberId,
  leaveConditions,
}: Props) => {
  const [open, setOpen] = useState(false);
  const toastRef = useRef<string | number | undefined>(undefined);
  const { execute: leaveWorkspace, isPending } = useAction(
    leaveWorkspaceAction,
    {
      onExecute: () => {
        toastRef.current = toast.loading("Leaving team...");
      },
      onSuccess: () => {
        toast.success("You have left the team", {
          id: toastRef.current,
        });
        setOpen(false);
        // Redirect to home page or another appropriate location
      },
      onError: ({ error }) => {
        toast.error(error.serverError || "Failed to leave the team", {
          id: toastRef.current,
        });
      },
    },
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Leave Team</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave Team</DialogTitle>
          <DialogDescription>
            {leaveConditions === "DISABLED_IS_LAST_ADMIN"
              ? "You are the last admin of this team. You cannot leave until you promote another member to admin."
              : "Are you sure you want to leave this team? This action cannot be undone."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => leaveWorkspace({ workspaceId, memberId })}
            disabled={leaveConditions === "DISABLED_IS_LAST_ADMIN" || isPending}
          >
            {isPending ? "Leaving..." : "Leave Team"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
