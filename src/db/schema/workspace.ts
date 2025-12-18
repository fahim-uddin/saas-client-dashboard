import { boolean, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./better-auth";

export const cloudProviderEnum = pgEnum("cloud_provider", [
  "AWS",
  "GCP",
  "AZURE",
]);

export const workspace = pgTable("workspace", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  primaryProvider: cloudProviderEnum("primary_provider"),
  providerConnected: boolean("provider_connected").default(false),
  ownerId: text("owner_id")
    .references(() => user.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
