import { jsonb, pgEnum, pgTable, text } from "drizzle-orm/pg-core";

export const billingProductTypeEnum = pgEnum("billing_product_type", [
  "one_time",
  "recurring",
]);

export const billingProduct = pgTable("billing_product", {
  id: text("id").primaryKey(), // Internal ID
  polarProductId: text("polar_product_id").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  type: billingProductTypeEnum("type").notNull(),
  slug: text("slug"), // e.g. 'pro'
  metadata: jsonb("metadata"),
});
