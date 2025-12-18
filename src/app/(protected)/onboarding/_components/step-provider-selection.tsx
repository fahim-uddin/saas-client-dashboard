"use client";

import { parseAsInteger, useQueryState } from "nuqs";
import {
  OnboardingCard,
  OnboardingCardContent,
  OnboardingCardDescription,
  OnboardingCardFooter,
  OnboardingCardHeader,
  OnboardingCardTitle,
} from "@/components/themes/default/ui/onboarding-card";
import { ProviderSelectCard } from "@/components/themes/default/ui/provider-select-card";
import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "@/stores/onboarding-store";
import { ONBOARDING_STEPS } from "../_config/steps";

export function StepProviderSelection() {
  const { primaryProvider, setPrimaryProvider } = useOnboardingStore();
  const [step, setStep] = useQueryState("step", parseAsInteger.withDefault(1));

  const handleContinue = () => {
    if (primaryProvider) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <OnboardingCard className="max-w-3xl">
      <OnboardingCardHeader>
        <OnboardingCardTitle>{ONBOARDING_STEPS[1].title}</OnboardingCardTitle>
        <OnboardingCardDescription>
          {ONBOARDING_STEPS[1].description}
        </OnboardingCardDescription>
      </OnboardingCardHeader>
      <OnboardingCardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ProviderSelectCard
            title="AWS"
            description="Best if your infra is on AWS"
            selected={primaryProvider === "AWS"}
            onClick={() => setPrimaryProvider("AWS")}
          />
          <ProviderSelectCard
            title="GCP"
            description="Best if your infra is on Google Cloud"
            selected={primaryProvider === "GCP"}
            onClick={() => setPrimaryProvider("GCP")}
          />
          <ProviderSelectCard
            title="Azure"
            description="Best if your infra is on Azure"
            selected={primaryProvider === "AZURE"}
            onClick={() => setPrimaryProvider("AZURE")}
          />
        </div>
      </OnboardingCardContent>
      <OnboardingCardFooter className="flex justify-between gap-4">
        <Button variant="outline" onClick={handleBack}>
          Back
        </Button>
        <Button onClick={handleContinue} disabled={!primaryProvider}>
          Continue
        </Button>
      </OnboardingCardFooter>
    </OnboardingCard>
  );
}
