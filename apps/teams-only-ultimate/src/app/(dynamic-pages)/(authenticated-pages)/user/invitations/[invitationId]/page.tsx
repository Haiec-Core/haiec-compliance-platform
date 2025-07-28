import { T } from "@/components/ui/Typography";
import { Skeleton } from "@/components/ui/skeleton";
import { getInvitationById } from "@/data/user/invitation";
import type { DBTable } from "@/types";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { z } from "zod";
import { ConfirmAcceptInvitationDialog } from "./ConfirmAcceptInvitationDialog";
import { ConfirmDeclineInvitationDialog } from "./ConfirmDeclineInvitationDialog";

const paramsSchema = z.object({
  invitationId: z.string(),
});

async function Invitation({ invitationId }: { invitationId: string }) {
  try {
    const invitation = await getInvitationById(invitationId);

    const inviter = Array.isArray(invitation.inviter)
      ? invitation.inviter[0]
      : invitation.inviter;
    const workspace = Array.isArray(invitation.workspace)
      ? (invitation.workspace[0] as DBTable<"workspaces"> | null)
      : invitation.workspace;
    if (!workspace || !inviter) {
      throw new Error("Workspace or Inviter not found");
    }

    return (
      <div className="space-y-2 mx-auto max-w-300px">
        <T.H2>Invitation from {inviter.full_name}</T.H2>
        <div className="space-y-2">
          <T.P>
            You have been invited to join <strong>{workspace.name}</strong> as a{" "}
            <strong>{invitation.invitee_user_role}</strong>.
          </T.P>
          <div className="space-x-2">
            <ConfirmAcceptInvitationDialog invitationId={invitation.id} />
            <ConfirmDeclineInvitationDialog invitationId={invitation.id} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}

export default async function InvitationPage(props: {
  params: Promise<unknown>;
}) {
  const params = await props.params;
  const { invitationId } = paramsSchema.parse(params);

  return (
    <Suspense fallback={<Skeleton className="w-16 h-6" />}>
      <Invitation invitationId={invitationId} />
    </Suspense>
  );
}
