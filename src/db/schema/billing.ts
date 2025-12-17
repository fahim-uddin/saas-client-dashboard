import { jsonb, pgTable, text } from "drizzle-orm/pg-core";

export const billingProduct = pgTable("billing_product", {
  id: text("id").primaryKey(), // Internal ID
  polarProductId: text("polar_product_id").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  type: text("type").notNull(), // 'one_time' | 'recurring'
  slug: text("slug"), // e.g. 'pro'
  metadata: jsonb("metadata"),
});
