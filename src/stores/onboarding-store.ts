import { create } from "zustand";

export type CloudProvider = "AWS" | "GCP" | "AZURE";

interface OnboardingState {
  workspaceName: string;
  primaryProvider: CloudProvider | null;

  setWorkspaceName: (name: string) => void;
  setPrimaryProvider: (provider: CloudProvider) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()((set) => ({
  workspaceName: "",
  primaryProvider: null,

  setWorkspaceName: (name) => set({ workspaceName: name }),
  setPrimaryProvider: (provider) => set({ primaryProvider: provider }),
  reset: () => set({ workspaceName: "", primaryProvider: null }),
}));
