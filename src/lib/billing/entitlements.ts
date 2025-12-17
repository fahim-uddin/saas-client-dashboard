import { eq } from "drizzle-orm";
import { db } from "@/db";
import { organization } from "@/db/schema/better-auth";
// We need server-side access to Polar or cached data.

export async function updateOrganizationEntitlements(
  billingReferenceId: string,
  data: Partial<typeof organization.$inferSelect>,
) {
  // Update organization entitlements in DB
  await db
    .update(organization)
    .set(data)
    .where(eq(organization.billingReferenceId, billingReferenceId));
}

export async function getOrganizationEntitlements(organizationId: string) {
  const org = await db.query.organization.findFirst({
    where: eq(organization.id, organizationId),
    columns: {
      plan: true,
      isPaid: true,
      entitlements: true,
    },
  });
  return org;
}

// Helper to assert pro (example)
export async function assertProOrg(organizationId: string) {
  const entitlements = await getOrganizationEntitlements(organizationId);
  if (!entitlements?.isPaid && entitlements?.plan !== "pro") {
    throw new Error("Organization requires Pro plan");
  }
  return true;
}
