"use client";
import { WorkspaceMemberRoleSelect } from "@/components/WorkspaceMemberRoleSelect";
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
import { updateWorkspaceMemberRoleAction } from "@/data/user/workspaces";
import type { Enum } from "@/types";
import { UserCog } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  workspaceId: string;
  memberId: string;
  currentRole: Enum<"workspace_member_role_type">;
};

export const EditMemberRoleDialog = ({
  workspaceId,
  memberId,
  currentRole,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<
    Exclude<Enum<"workspace_member_role_type">, "owner">
  >(currentRole === "owner" ? "admin" : currentRole);

  const { execute: updateRole, isPending } = useAction(
    updateWorkspaceMemberRoleAction,
    {
      onSuccess: () => {
        toast.success("Member role updated successfully");
        setOpen(false);
      },
      onError: ({ error }) => {
        toast.error(error.serverError || "Failed to update member role");
      },
    },
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <UserCog className="mr-2 h-4 w-4" />
          <span>Edit Role</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Member Role</DialogTitle>
          <DialogDescription>
            Change the role of this workspace member.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <WorkspaceMemberRoleSelect
            value={role}
            onChange={(newRole) => setRole(newRole)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => updateRole({ workspaceId, memberId, role })}
            disabled={isPending}
          >
            {isPending ? "Updating..." : "Update Role"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
