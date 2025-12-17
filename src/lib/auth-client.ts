import { polarClient } from "@polar-sh/better-auth/client";
import { createAuthClient } from "better-auth/client";
import { organizationClient } from "better-auth/client/plugins";
// import { dubAnalyticsClient } from '@dub/better-auth/client'; // Not available in 0.0.6

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  plugins: [
    organizationClient(),
    polarClient(),
    // dubAnalyticsClient(),
  ],
});
