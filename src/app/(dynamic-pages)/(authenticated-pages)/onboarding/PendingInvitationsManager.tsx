"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useOnboarding } from "./OnboardingContext";

interface PendingInvitationsManagerProps {
  onSkip: () => void;
}

export function PendingInvitationsManager({
  onSkip,
}: PendingInvitationsManagerProps) {
  const { pendingInvitations, bulkSettleInvitationsActionState } =
    useOnboarding();
  const [invitationActions, setInvitationActions] = useState(
    pendingInvitations.map((invitation) => ({
      invitationId: invitation.id,
      action: "not_accepted" as "accepted" | "not_accepted",
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
    bulkSettleInvitationsActionState.execute({ invitationActions });
  };

  return (
    <div className="space-y-4">
      <h2
        className="text-lg font-semibold"
        data-testid="pending-invitations-title"
      >
        Pending Invitations
      </h2>
      <p className="text-sm text-gray-500">
        You have pending workspace invitations. Accept or decline them below.
      </p>
      <div className="space-y-4">
        {pendingInvitations.map((invitation) => (
          <div
            key={invitation.id}
            data-testid={`invitation-${invitation.id}`}
            className="flex items-center justify-between"
          >
            <span>{invitation.workspace.name}</span>
            <Switch
              data-testid="invitation-switch"
              checked={
                invitationActions.find(
                  (item) => item.invitationId === invitation.id,
                )?.action === "accepted"
              }
              onCheckedChange={() => handleToggle(invitation.id)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onSkip}>
          Skip
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={bulkSettleInvitationsActionState.status === "executing"}
        >
          {bulkSettleInvitationsActionState.status === "executing"
            ? "Processing..."
            : "Confirm"}
        </Button>
      </div>
    </div>
  );
}
