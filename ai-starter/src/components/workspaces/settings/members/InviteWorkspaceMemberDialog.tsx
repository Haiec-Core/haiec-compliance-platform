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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Enum } from "@/types";
import { UserPlus } from "lucide-react";
import { useState } from "react";

type Props = {
  onInvite: (
    email: string,
    role: Exclude<Enum<"workspace_member_role_type">, "owner">,
  ) => void;
  isLoading: boolean;
};

export const InviteWorkspaceMemberDialog = ({ onInvite, isLoading }: Props) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] =
    useState<Exclude<Enum<"workspace_member_role_type">, "owner">>("member");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          data-testid="invite-user-button"
          size="default"
        >
          <UserPlus className="mr-2 w-5 h-5" />
          Invite user
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 mb-2 rounded-lg">
            <UserPlus className=" w-6 h-6" />
          </div>
          <div className="p-1">
            <DialogTitle className="text-lg">Invite user</DialogTitle>
            <DialogDescription className="text-base mt-0">
              Invite a user to your workspace.
            </DialogDescription>
          </div>
        </DialogHeader>
        <form
          data-testid="invite-user-form"
          onSubmit={(event) => {
            event.preventDefault();
            onInvite(email, role);
            setEmail("");
            setOpen(false);
          }}
        >
          <div className="mb-8">
            <div className="flex flex-col space-y-2 justify-start w-full mb-4">
              <Label className="text-muted-foreground">Select a role</Label>
              <WorkspaceMemberRoleSelect
                value={role}
                onChange={(newRole) => setRole(newRole)}
              />
            </div>
            <Label className="text-muted-foreground">Enter Email</Label>
            <Input
              className="mt-1.5 shadow-sm appearance-none border h-11 rounded-lg w-full py-2 px-3 focus:ring-0 leading-tight focus:outline-hidden focus:shadow-outline text-base"
              id="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              required
              disabled={isLoading}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Inviting User" : "Invite"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
