"use client";

import { bulkSettleInvitationsAction } from "@/data/user/invitation";
import {
  acceptTermsOfServiceAction,
  updateProfilePictureUrlAction,
  updateUserFullNameAction,
  uploadPublicUserAvatarAction,
} from "@/data/user/user";
import { createWorkspaceAction } from "@/data/user/workspaces";
import type { DBTable, WorkspaceInvitation } from "@/types";
import { getRandomCuteAvatar } from "@/utils/cute-avatars";
import type { AuthUserMetadata } from "@/utils/zod-schemas/authUserMetadata";
import {
  InferUseOptimisticActionHookReturn,
  useOptimisticAction,
} from "next-safe-action/hooks";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

/**
 * The first step is to get the user to accept the terms of service.
 * The second step is to get the user to update their profile.
 * The third step is to setup workspaces for the user.
 *  - if the user has existing invitations to workspaces, they are prompted to accept or decline and / or
 *  - if the user has no personal workspace of their own
 *  - if user already has a personal workspace, they are redirected to the dashboard
 */
export type FLOW_STATE =
  | "TERMS"
  | "PROFILE"
  | "SETUP_WORKSPACES"
  | "FINISHING_UP";

interface OnboardingContextType {
  onboardingStatus: AuthUserMetadata;
  currentStep: FLOW_STATE;
  nextStep: () => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<FLOW_STATE>>;
  userProfile: DBTable<"user_profiles">;
  userEmail: string | undefined;
  profileUpdateActionState: InferUseOptimisticActionHookReturn<
    typeof updateUserFullNameAction
  >;
  acceptTermsActionState: InferUseOptimisticActionHookReturn<
    typeof acceptTermsOfServiceAction
  >;
  createWorkspaceActionState: InferUseOptimisticActionHookReturn<
    typeof createWorkspaceAction
  >;
  uploadAvatarMutation: InferUseOptimisticActionHookReturn<
    typeof uploadPublicUserAvatarAction
  >;
  avatarURLState: string | undefined;
  flowStates: FLOW_STATE[];
  pendingInvitations: WorkspaceInvitation[];
  bulkSettleInvitationsActionState: InferUseOptimisticActionHookReturn<
    typeof bulkSettleInvitationsAction
  >;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined,
);

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}

interface OnboardingProviderProps {
  children: React.ReactNode;
  userProfile: DBTable<"user_profiles">;
  onboardingStatus: AuthUserMetadata;
  userEmail: string | undefined;
  pendingInvitations: WorkspaceInvitation[];
}

function getAllFlowStates(onboardingStatus: AuthUserMetadata): FLOW_STATE[] {
  const {
    onboardingHasAcceptedTerms,
    onboardingHasCompletedProfile,
    onboardingHasCompletedWorkspaceSetup,
  } = onboardingStatus;
  const flowStates: FLOW_STATE[] = [];

  if (!onboardingHasAcceptedTerms) {
    flowStates.push("TERMS");
  }
  if (!onboardingHasCompletedProfile) {
    flowStates.push("PROFILE");
  }
  if (!onboardingHasCompletedWorkspaceSetup) {
    flowStates.push("SETUP_WORKSPACES");
  }
  flowStates.push("FINISHING_UP");

  return flowStates;
}

function getInitialFlowState(
  flowStates: FLOW_STATE[],
  onboardingStatus: AuthUserMetadata,
): FLOW_STATE {
  const {
    onboardingHasAcceptedTerms,
    onboardingHasCompletedProfile,
    onboardingHasCompletedWorkspaceSetup,
  } = onboardingStatus;

  if (!onboardingHasAcceptedTerms && flowStates.includes("TERMS")) {
    return "TERMS";
  }

  if (!onboardingHasCompletedProfile && flowStates.includes("PROFILE")) {
    return "PROFILE";
  }

  if (
    !onboardingHasCompletedWorkspaceSetup &&
    flowStates.includes("SETUP_WORKSPACES")
  ) {
    return "SETUP_WORKSPACES";
  }

  return "FINISHING_UP";
}

export function OnboardingProvider({
  children,
  userProfile,
  onboardingStatus,
  userEmail,
  pendingInvitations,
}: OnboardingProviderProps) {
  const [avatarUrl, setAvatarUrl] = useState(
    userProfile.avatar_url ?? undefined,
  );
  const toastRef = useRef<string | number | undefined>(undefined);

  const flowStates = useMemo(
    () => getAllFlowStates(onboardingStatus),
    [onboardingStatus],
  );
  const [currentStep, setCurrentStep] = useState<FLOW_STATE>(
    getInitialFlowState(flowStates, onboardingStatus),
  );

  const nextStep = useCallback(() => {
    setCurrentStep((prevStep) => {
      const currentIndex = flowStates.indexOf(prevStep);
      if (currentIndex < flowStates.length - 1) {
        return flowStates[currentIndex + 1];
      }
      return prevStep;
    });
  }, [flowStates]);

  const profileUpdateActionState = useOptimisticAction(
    updateUserFullNameAction,
    {
      onExecute: () => {
        nextStep();
      },
      onError: () => {
        toast.error("Failed to update profile");
      },
      currentState: null,
      updateFn: () => {
        return null;
      },
    },
  );

  const acceptTermsActionState = useOptimisticAction(
    acceptTermsOfServiceAction,
    {
      onExecute: () => {
        nextStep();
      },
      onError: () => {
        toast.error("Failed to accept terms");
      },
      currentState: null,
      updateFn: () => {
        return null;
      },
    },
  );

  const createWorkspaceActionState = useOptimisticAction(
    createWorkspaceAction,
    {
      onExecute: () => {
        nextStep();
      },
      currentState: null,
      updateFn: () => {
        return null;
      },
      onError: () => {
        toast.error("Failed to create workspace");
      },
    },
  );

  const updateProfilePictureUrlActionState = useOptimisticAction(
    updateProfilePictureUrlAction,
    {
      currentState: avatarUrl,
      updateFn: (profilePictureUrl) => {
        return profilePictureUrl;
      },
    },
  );

  /**
   * This action uploads a file and updates the user's avatar url
   */
  const uploadAvatarMutation = useOptimisticAction(
    uploadPublicUserAvatarAction,
    {
      onExecute: () => {
        toastRef.current = toast.loading("Uploading avatar...", {
          description: "Please wait while we upload your avatar.",
        });
      },
      currentState: avatarUrl,
      updateFn: (profilePictureUrl, { formData }) => {
        // conver file to data url
        try {
          const file = formData.get("file");
          if (file instanceof File) {
            const fileUrl = URL.createObjectURL(file);
            return fileUrl;
          }
        } catch (error) {
          console.error(error);
        }
        return profilePictureUrl;
      },
      onSuccess: (response) => {
        setAvatarUrl(response.data);
        toast.success("Avatar uploaded!", {
          description: "Your avatar has been successfully uploaded.",
          id: toastRef.current,
        });
        toastRef.current = undefined;
      },
      onError: () => {
        toast.error("Error uploading avatar", { id: toastRef.current });
        toastRef.current = undefined;
      },
    },
  );

  /**
   * This action settles all pending invitations for the user
   */
  const bulkSettleInvitationsActionState = useOptimisticAction(
    bulkSettleInvitationsAction,
    {
      onError: (error) => {
        toast.error("Failed to process invitations");
        console.error(error);
      },
      currentState: null,
      updateFn: () => {
        return null;
      },
    },
  );

  useEffect(() => {
    // only run this on mount
    if (!userProfile.avatar_url) {
      const avatarUrl = getRandomCuteAvatar();
      updateProfilePictureUrlActionState.execute({
        profilePictureUrl: avatarUrl,
      });
    }
  }, []);

  // if the update profile picture action is executing, return the optimistic state
  // otherwise return the avatar url
  const avatarURLState = useMemo(() => {
    if (uploadAvatarMutation.status === "executing") {
      return uploadAvatarMutation.optimisticState;
    }
    return updateProfilePictureUrlActionState.status === "executing"
      ? updateProfilePictureUrlActionState.optimisticState
      : avatarUrl;
  }, [
    updateProfilePictureUrlActionState.optimisticState,
    avatarUrl,
    updateProfilePictureUrlActionState.status,
    uploadAvatarMutation.status,
    uploadAvatarMutation.optimisticState,
  ]);

  const value: OnboardingContextType = useMemo(
    () => ({
      currentStep,
      nextStep,
      userProfile,
      userEmail,
      profileUpdateActionState,
      acceptTermsActionState,
      createWorkspaceActionState,
      flowStates,
      setCurrentStep,
      uploadAvatarMutation,
      avatarURLState,
      onboardingStatus,
      pendingInvitations,
      bulkSettleInvitationsActionState,
    }),
    [
      currentStep,
      nextStep,
      userProfile,
      userEmail,
      profileUpdateActionState,
      acceptTermsActionState,
      createWorkspaceActionState,
      flowStates,
      setCurrentStep,
      uploadAvatarMutation,
      avatarURLState,
      onboardingStatus,
      pendingInvitations,
      bulkSettleInvitationsActionState,
    ],
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}
