"use client";

import { parseAsInteger, useQueryState } from "nuqs";
import { Suspense } from "react";
import { Progress } from "@/components/ui/progress";
import { StepConnectCloud } from "./_components/step-connect-cloud";
import { StepProviderSelection } from "./_components/step-provider-selection";
import { StepWorkspaceName } from "./_components/step-workspace-name";
import { ONBOARDING_STEPS } from "./_config/steps";

function OnboardingContent() {
  const [step] = useQueryState("step", parseAsInteger.withDefault(1));

  const currentStepIndex = Math.max(
    0,
    Math.min(step - 1, ONBOARDING_STEPS.length - 1),
  );

  // Calculate progress
  const progress = ((currentStepIndex + 1) / ONBOARDING_STEPS.length) * 100;

  const renderStep = () => {
    switch (currentStepIndex) {
      case 0:
        return <StepWorkspaceName />;
      case 1:
        return <StepProviderSelection />;
      case 2:
        return <StepConnectCloud />;
      default:
        return <StepWorkspaceName />;
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md mb-8 space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            Step {currentStepIndex + 1} of {ONBOARDING_STEPS.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="w-full">{renderStep()}</div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <OnboardingContent />
    </Suspense>
  );
}
