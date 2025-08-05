import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { generateWorkspaceSlug } from "@/lib/utils";
import { useState } from "react";
import { useOnboarding } from "./OnboardingContext";

export function SetupWorkspaces() {
  const {
    createWorkspaceActionState,
    pendingInvitations,
    bulkSettleInvitationsActionState,
  } = useOnboarding();

  const [invitationActions, setInvitationActions] = useState(
    pendingInvitations.map((invitation) => ({
      invitationId: invitation.id,
      action: "decline" as "accept" | "decline",
    })),
  );

  const handleToggle = (invitationId: string) => {
    setInvitationActions((prev) =>
      prev.map((item) =>
        item.invitationId === invitationId
          ? { ...item, action: item.action === "accept" ? "decline" : "accept" }
          : item,
      ),
    );
  };

  const handleConfirm = () => {
    // Handle pending invitations
    if (pendingInvitations.length > 0) {
      bulkSettleInvitationsActionState.execute({ invitationActions });
    }
    // Create solo workspace
    const workspaceName = "Personal";
    const workspaceSlug = generateWorkspaceSlug(workspaceName);
    createWorkspaceActionState.execute({
      name: workspaceName,
      slug: workspaceSlug,
      workspaceType: "solo",
      isOnboardingFlow: true,
    });
  };

  return (
    <>
      <CardHeader>
        <CardTitle data-testid="setup-workspaces-title">
          Setting Up Your Workspaces
        </CardTitle>
        <CardDescription>
          Let&apos;s set up your workspace environment.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Personal Workspace</h3>
          <p className="text-sm text-gray-500">
            A personal workspace will be set up for you automatically. You can
            create team workspaces from the dashboard later.
          </p>
        </div>
        {pendingInvitations.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Pending Invitations</h3>
            <p className="text-sm text-gray-500 mb-4">
              You have pending workspace invitations. Accept or decline them
              below.
            </p>
            <div className="space-y-4">
              {pendingInvitations.map((invitation) => (
                <div
                  key={invitation.id}
                  className="flex items-center justify-between"
                >
                  <span>{invitation.workspace.name}</span>
                  <Switch
                    checked={
                      invitationActions.find(
                        (item) => item.invitationId === invitation.id,
                      )?.action === "accept"
                    }
                    onCheckedChange={() => handleToggle(invitation.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleConfirm} className="w-full">
          Continue
        </Button>
      </CardFooter>
    </>
  );
}
