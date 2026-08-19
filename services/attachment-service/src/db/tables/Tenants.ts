import { boolean, pgTable, varchar } from "drizzle-orm/pg-core";
import { idColumn } from "@/db/columns";

export const Tenants = pgTable("tenants", {
  ...idColumn,
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  isActive: boolean("is_active").notNull().default(true),
});

export type Tenant = typeof Tenants.$inferSelect;
export type NewTenant = typeof Tenants.$inferInsert;
