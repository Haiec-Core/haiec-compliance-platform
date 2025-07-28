"use client";

import { AnimatePresence, motion } from "motion/react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { ProfileUpdate } from "./ProfileUpdate";
import { TermsAcceptance } from "./TermsAcceptance";

import { Stepper } from "@/components/stepper";
import { Building, Paperclip, UserCheck } from "lucide-react";
import { FinishingUp } from "./FinishingUp";
import { useOnboarding } from "./OnboardingContext";
import { SetupWorkspaces } from "./SetupWorkspaces";

const MotionCard = motion(Card);

export function OnboardingFlowContent() {
  const { currentStep } = useOnboarding();

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  const steps = [
    {
      name: "Terms",
      icon: <Paperclip className="w-5 h-5 mr-2" />,
      isActive: currentStep === "TERMS",
    },
    {
      name: "Profile",
      icon: <UserCheck className="w-5 h-5 mr-2" />,
      isActive: currentStep === "PROFILE",
    },
    {
      name: "Workspace",
      icon: <Building className="w-5 h-5 mr-2" />,
      isActive: currentStep === "SETUP_WORKSPACES",
    },
  ];

  if (currentStep === "FINISHING_UP") {
    return <FinishingUp />;
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <MotionCard>
        <CardHeader>
          <Stepper steps={steps} />
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            <MotionCard
              key={currentStep}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {currentStep === "TERMS" && <TermsAcceptance />}
              {currentStep === "PROFILE" && <ProfileUpdate />}
              {currentStep === "SETUP_WORKSPACES" && <SetupWorkspaces />}
            </MotionCard>
          </AnimatePresence>
        </CardContent>
      </MotionCard>
    </div>
  );
}
