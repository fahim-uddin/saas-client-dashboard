export const ONBOARDING_STEPS = [
  {
    id: "workspace",
    title: "Create your workspace",
    description: "Give your workspace a name to get started.",
  },
  {
    id: "provider",
    title: "Choose your primary cloud provider",
    description: "You can change or add more later.",
  },
  {
    id: "connect",
    title: "Connect to your cloud account",
    description:
      "Connect now for smoother deployments, or skip and connect later.",
  },
] as const;

export type OnboardingStepId = (typeof ONBOARDING_STEPS)[number]["id"];
