import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { workspace } from "@/db/schema";

export const WorkspaceService = {
  create: async (data: {
    name: string;
    primaryProvider: "AWS" | "GCP" | "AZURE";
    providerConnected: boolean;
    ownerId: string;
  }) => {
    const id = createId();
    await db.insert(workspace).values({
      id,
      ...data,
    });
    return { id };
  },
  getByUserId: async (userId: string) => {
    return await db
      .select()
      .from(workspace)
      .where(eq(workspace.ownerId, userId));
  },
};
