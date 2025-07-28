import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMinDelayCondition } from "@/hooks/useMinDelayCondition";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FLOW_STATE, useOnboarding } from "./OnboardingContext";

type Step = {
  id: FLOW_STATE;
  label: string;
  completedLabel: string;
};

export function FinishingUp() {
  const {
    onboardingStatus,
    profileUpdateActionState,
    createWorkspaceActionState,
    acceptTermsActionState,
  } = useOnboarding();
  const router = useRouter();

  const steps: Step[] = [
    {
      id: "TERMS",
      label: "📝 Accept Terms and Conditions",
      completedLabel: "✅ Terms Accepted",
    },
    {
      id: "PROFILE",
      label: "🧢 Setting Up Your Profile",
      completedLabel: "✅ Profile Set Up",
    },
    {
      id: "SETUP_WORKSPACES",
      label: "📚 Setting Up Your Workspaces",
      completedLabel: "🎉 Workspaces Ready",
    },
    {
      id: "FINISHING_UP",
      label: "📌 Almost there...",
      completedLabel: "🎉 All Set!",
    },
  ];

  // this is to ensure that all optimistic updates have finished one by one.
  // we go through each step and confirm status.
  const [currentStepId, setCurrentStepId] = useState<FLOW_STATE>("TERMS");

  const isProfileSetupConfirmed = useMemo(() => {
    return (
      onboardingStatus.onboardingHasCompletedProfile ||
      profileUpdateActionState.status === "hasSucceeded"
    );
  }, [
    onboardingStatus.onboardingHasCompletedProfile,
    profileUpdateActionState.status,
  ]);

  const isWorkspaceSetupConfirmed = useMemo(() => {
    return (
      onboardingStatus.onboardingHasCreatedWorkspace ||
      createWorkspaceActionState.status === "hasSucceeded"
    );
  }, [
    onboardingStatus.onboardingHasCreatedWorkspace,
    createWorkspaceActionState.status,
  ]);

  const isTermsAcceptedConfirmed = useMemo(() => {
    return (
      onboardingStatus.onboardingHasAcceptedTerms ||
      acceptTermsActionState.status === "hasSucceeded"
    );
  }, [
    onboardingStatus.onboardingHasAcceptedTerms,
    acceptTermsActionState.status,
  ]);

  useMinDelayCondition({
    enabled: true,
    onComplete: () => {
      setCurrentStepId("PROFILE");
    },
    minDelayMs: 500,
    condition: isTermsAcceptedConfirmed,
  });

  useMinDelayCondition({
    enabled: currentStepId === "PROFILE",
    onComplete: () => {
      setCurrentStepId("SETUP_WORKSPACES");
    },
    minDelayMs: 500,
    condition: isProfileSetupConfirmed,
  });

  useMinDelayCondition({
    enabled: currentStepId === "SETUP_WORKSPACES",
    onComplete: () => {
      setCurrentStepId("FINISHING_UP");
    },
    minDelayMs: 500,
    condition: isWorkspaceSetupConfirmed,
  });

  useMinDelayCondition({
    enabled: currentStepId === "FINISHING_UP",
    onComplete: () => {
      router.push("/dashboard");
    },
    minDelayMs: 500,
    condition: true,
  });

  useEffect(() => {
    router.prefetch(`/home`);
    router.prefetch(`/workspaces/[workspaceSlug]/home`);
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Setting Up Your Account</CardTitle>
        <CardDescription>
          We&apos;re getting everything ready for you.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="min-w-72">
          {steps.map((step, index) => {
            const currentStep = currentStepId === step.id;
            const currentStepIndex = steps.findIndex(
              (step) => step.id === currentStepId,
            );
            const currentStepStatus =
              currentStepIndex > index
                ? "completed"
                : currentStep
                  ? "loading"
                  : "waiting";
            return (
              <div
                key={step.id}
                data-testid={`onboarding-step-${step.id.toLowerCase()}`}
                data-status={currentStepStatus}
                className="flex items-center space-x-4"
              >
                {currentStepStatus === "loading" && (
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                )}
                {currentStepStatus === "completed" && (
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                )}
                {currentStepStatus === "waiting" && (
                  <div className="h-6 w-6 rounded-full border-2 border-gray-300" />
                )}
                <span className="text-sm font-medium">
                  {currentStepStatus === "completed"
                    ? step.completedLabel
                    : step.label}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
