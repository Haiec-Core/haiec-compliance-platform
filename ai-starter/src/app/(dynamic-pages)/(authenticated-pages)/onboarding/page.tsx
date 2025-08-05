import { Skeleton } from "@/components/ui/skeleton";
import { getPendingInvitationsOfUser } from "@/data/user/invitation";
import { getUserProfile } from "@/data/user/user";
import {
  fetchSlimWorkspaces,
  getMaybeDefaultWorkspace,
  setDefaultWorkspaceAction,
} from "@/data/user/workspaces";
import { serverGetLoggedInUser } from "@/utils/server/serverGetLoggedInUser";
import { authUserMetadataSchema } from "@/utils/zod-schemas/authUserMetadata";
import { Suspense } from "react";
import { OnboardingProvider } from "./OnboardingContext";
import { OnboardingFlowContent } from "./OnboardingFlow";

async function getDefaultOrganizationOrSet(): Promise<string | null> {
  const [slimWorkspaces, defaultWorkspaceResponse] = await Promise.all([
    fetchSlimWorkspaces(),
    getMaybeDefaultWorkspace(),
  ]);
  const firstWorkspace = slimWorkspaces[0];

  if (defaultWorkspaceResponse) {
    return defaultWorkspaceResponse.workspace.id;
  }

  if (!firstWorkspace) {
    return null;
  }

  // if the user has an organization already for some
  // reason, because of an invite or for some other reason,
  // make sure that the default organization is set to the first
  await setDefaultWorkspaceAction({
    workspaceId: firstWorkspace.id,
  });

  return firstWorkspace.id;
}

async function getOnboardingConditions(userId: string) {
  const [userProfile, defaultOrganizationId] = await Promise.all([
    getUserProfile(userId),
    getDefaultOrganizationOrSet(),
  ]);

  return {
    userProfile,
    defaultOrganizationId,
  };
}

async function OnboardingFlowWrapper() {
  const user = await serverGetLoggedInUser();
  const [onboardingConditions, pendingInvitations] = await Promise.all([
    getOnboardingConditions(user.id),
    getPendingInvitationsOfUser(),
  ]);
  const { userProfile } = onboardingConditions;

  const onboardingStatus = authUserMetadataSchema.parse(user.user_metadata);

  return (
    <OnboardingProvider
      userProfile={userProfile}
      onboardingStatus={onboardingStatus}
      userEmail={user.email}
      pendingInvitations={pendingInvitations}
    >
      <OnboardingFlowContent />
    </OnboardingProvider>
  );
}

export default async function OnboardingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 onboarding-page">
      <Suspense fallback={<Skeleton className="w-full max-w-md h-[400px]" />}>
        <OnboardingFlowWrapper />
      </Suspense>
    </div>
  );
}
