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
import { Input } from "@/components/ui/input";
import { removeWorkspaceMemberAction } from "@/data/user/workspaces";
import { UserMinus } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  workspaceId: string;
  memberId: string;
  memberName: string;
};

export const RemoveMemberDialog = ({
  workspaceId,
  memberId,
  memberName,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const { execute: removeMember, isPending } = useAction(
    removeWorkspaceMemberAction,
    {
      onSuccess: () => {
        toast.success("Member removed successfully");
        setOpen(false);
      },
      onError: ({ error }) => {
        toast.error(error.serverError || "Failed to remove member");
      },
    },
  );

  const isConfirmed = confirmText === memberName;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <UserMinus className="mr-2 h-4 w-4" />
          <span>Remove from Team</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove Team Member</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove {memberName} from the team? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input
            placeholder={`Type "${memberName}" to confirm`}
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => removeMember({ workspaceId, memberId })}
            disabled={!isConfirmed || isPending}
          >
            {isPending ? "Removing..." : "Remove Member"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
