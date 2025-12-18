"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  OnboardingCard,
  OnboardingCardContent,
  OnboardingCardDescription,
  OnboardingCardFooter,
  OnboardingCardHeader,
  OnboardingCardTitle,
} from "@/components/themes/default/ui/onboarding-card";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/eden";
import { useOnboardingStore } from "@/stores/onboarding-store";
import { ONBOARDING_STEPS } from "../_config/steps";

export function StepConnectCloud() {
  const { primaryProvider, workspaceName } = useOnboardingStore();
  const [isConnecting, setIsConnecting] = useState(false);
  const router = useRouter();

  const handleComplete = async (connected: boolean) => {
    if (!primaryProvider) return;

    setIsConnecting(true);
    try {
      const { error } = await api.api.workspace.create.post({
        name: workspaceName,
        primaryProvider: primaryProvider,
        providerConnected: connected,
      });

      if (error) {
        throw error;
      }

      toast.success(
        "Workspace ready. You can connect your cloud account anytime from Settings.",
      );
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create workspace. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <OnboardingCard>
      <OnboardingCardHeader>
        <OnboardingCardTitle>{ONBOARDING_STEPS[2].title}</OnboardingCardTitle>
        <OnboardingCardDescription>
          {ONBOARDING_STEPS[2].description}
        </OnboardingCardDescription>
      </OnboardingCardHeader>
      <OnboardingCardContent className="space-y-4">
        <div className="p-4 border border-border rounded-lg bg-muted/20">
          <h3 className="font-medium mb-2">
            Connect {primaryProvider} Account
          </h3>
          <p className="text-sm text-muted-foreground">
            Allow read-only access to your {primaryProvider} resources for
            seamless imports. Your data is encrypted and secure.
          </p>
        </div>
      </OnboardingCardContent>
      <OnboardingCardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <Button
          variant="ghost"
          onClick={() => handleComplete(false)}
          disabled={isConnecting}
        >
          Skip for now
        </Button>
        <Button onClick={() => handleComplete(true)} disabled={isConnecting}>
          {isConnecting ? "Setting up..." : `Connect ${primaryProvider}`}
        </Button>
      </OnboardingCardFooter>
    </OnboardingCard>
  );
}
