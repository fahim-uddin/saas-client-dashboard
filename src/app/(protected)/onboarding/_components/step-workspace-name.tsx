"use client";

import { parseAsInteger, useQueryState } from "nuqs";
import { useState } from "react";
import { z } from "zod";
import {
  OnboardingCard,
  OnboardingCardContent,
  OnboardingCardDescription,
  OnboardingCardFooter,
  OnboardingCardHeader,
  OnboardingCardTitle,
} from "@/components/themes/default/ui/onboarding-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOnboardingStore } from "@/stores/onboarding-store";
import { ONBOARDING_STEPS } from "../_config/steps";

const workspaceSchema = z
  .string()
  .min(1, "Workspace name is required")
  .max(40, "Name is too long")
  .regex(
    /^[a-zA-Z0-9 -]+$/,
    "Only alphanumeric characters, spaces and hyphens allowed",
  );

export function StepWorkspaceName() {
  const { workspaceName, setWorkspaceName } = useOnboardingStore();
  const [step, setStep] = useQueryState("step", parseAsInteger.withDefault(1));
  const [error, setError] = useState<string | null>(null);

  const handleContinue = () => {
    const result = workspaceSchema.safeParse(workspaceName);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    setError(null);
    setStep(step + 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkspaceName(e.target.value);
    if (error) setError(null);
  };

  return (
    <OnboardingCard>
      <OnboardingCardHeader>
        <OnboardingCardTitle>{ONBOARDING_STEPS[0].title}</OnboardingCardTitle>
        <OnboardingCardDescription>
          {ONBOARDING_STEPS[0].description}
        </OnboardingCardDescription>
      </OnboardingCardHeader>
      <OnboardingCardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="workspace-name">Workspace Name</Label>
          <Input
            id="workspace-name"
            placeholder="acme-infra"
            value={workspaceName}
            onChange={handleChange}
            className={error ? "border-destructive" : ""}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      </OnboardingCardContent>
      <OnboardingCardFooter>
        <Button
          className="w-full"
          onClick={handleContinue}
          disabled={!workspaceName}
        >
          Continue
        </Button>
      </OnboardingCardFooter>
    </OnboardingCard>
  );
}
