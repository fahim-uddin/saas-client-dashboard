import { dubAnalytics } from "@dub/better-auth";
import {
  checkout,
  polar,
  portal,
  usage,
  webhooks,
} from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization } from "better-auth/plugins";
import { Dub } from "dub";
import { db } from "@/db";
import { updateOrganizationEntitlements } from "@/lib/billing/entitlements";

const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN || "dummy",
  server: process.env.POLAR_ENV === "production" ? "production" : "sandbox",
});

const dubClient = new Dub({
  token: process.env.DUB_API_KEY || "dummy",
});

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  basePath: "/api/auth",
  secret: process.env.BETTER_AUTH_SECRET || "dummy-secret",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "dummy",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy",
    },
  },
  plugins: [
    organization(),
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          authenticatedUsersOnly: true,
        }),
        portal(),
        usage(),
        webhooks({
          secret: process.env.POLAR_WEBHOOK_SECRET || "dummy",
          onSubscriptionActive: async (payload) => {
            if (
              payload.data.metadata?.referenceId &&
              typeof payload.data.metadata.referenceId === "string"
            ) {
              await updateOrganizationEntitlements(
                payload.data.metadata.referenceId,
                {
                  plan: "pro", // Or derive from payload.data.productId
                  isPaid: true,
                },
              );
            }
          },
          onSubscriptionCanceled: async (payload) => {
            if (
              payload.data.metadata?.referenceId &&
              typeof payload.data.metadata.referenceId === "string"
            ) {
              await updateOrganizationEntitlements(
                payload.data.metadata.referenceId,
                {
                  plan: "free",
                  isPaid: false,
                },
              );
            }
          },
        }),
      ],
    }),
    dubAnalytics({
      dubClient,
      oauth: {
        clientId: process.env.DUB_OAUTH_CLIENT_ID || "dummy",
        clientSecret: process.env.DUB_OAUTH_CLIENT_SECRET || "dummy",
      },
    }),
  ],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
});
