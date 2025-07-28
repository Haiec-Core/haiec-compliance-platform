import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generateWorkspaceSlug } from "@/lib/utils";
import { Check } from "lucide-react";
import { useState } from "react";
import { useOnboarding } from "./OnboardingContext";

interface InvitationAction {
  invitationId: string;
  action: "accepted" | "not_accepted";
}

export function SetupWorkspaces() {
  const {
    createWorkspaceActionState,
    pendingInvitations,
    bulkSettleInvitationsActionState,
  } = useOnboarding();

  const [invitationActions, setInvitationActions] = useState<
    InvitationAction[]
  >(
    pendingInvitations.map((invitation) => ({
      invitationId: invitation.id,
      action: "not_accepted",
    })),
  );

  const handleToggle = (invitationId: string) => {
    setInvitationActions((prev) =>
      prev.map((item) =>
        item.invitationId === invitationId
          ? {
            ...item,
            action: item.action === "accepted" ? "not_accepted" : "accepted",
          }
          : item,
      ),
    );
  };

  const handleConfirm = () => {
    // Handle pending invitations
    if (pendingInvitations.length > 0) {
      const acceptedInvitations = invitationActions
        .filter((item) => item.action === "accepted")
        .map((item) => ({
          invitationId: item.invitationId,
          action: "accepted" as const,
        }));

      if (acceptedInvitations.length > 0) {
        bulkSettleInvitationsActionState.execute({
          invitationActions: acceptedInvitations,
        });
      }
    }

    // Create team workspace
    const workspaceName = "Team";
    const workspaceSlug = generateWorkspaceSlug(workspaceName);
    createWorkspaceActionState.execute({
      name: workspaceName,
      slug: workspaceSlug,
      workspaceType: "team",
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
          <h3 className="text-lg font-semibold mb-2">Team Workspace</h3>
          <p className="text-sm text-gray-500">
            A team workspace will be set up for you automatically. You will be
            able to invite other users to join your team.
          </p>
        </div>
        {pendingInvitations.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Pending Invitations</h3>
            <p className="text-sm text-gray-500 mb-4">
              You have pending workspace invitations. Accept the ones you want
              to join.
            </p>
            <div className="space-y-4">
              {pendingInvitations.map((invitation) => {
                const invitationAction = invitationActions.find(
                  (item) => item.invitationId === invitation.id,
                )?.action;

                return (
                  <div
                    key={invitation.id}
                    className="flex items-center justify-between"
                  >
                    <span>{invitation.workspace.name}</span>
                    <Button
                      variant={
                        invitationAction === "accepted" ? "default" : "outline"
                      }
                      onClick={() => handleToggle(invitation.id)}
                      className="min-w-[140px]"
                    >
                      {invitationAction === "accepted" ? (
                        <>
                          Accepted <Check className="ml-2 h-4 w-4" />
                        </>
                      ) : (
                        "Accept"
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Don&apos;t worry - you can always accept pending invitations later
              from your dashboard.
            </p>
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
