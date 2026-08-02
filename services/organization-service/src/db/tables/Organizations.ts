import { relations } from "drizzle-orm";
import { boolean, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";
import { Memberships } from "@/db/tables/Memberships";

export const Organizations = pgTable("organizations", {
  ...idColumn,
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  isActive: boolean("is_active").notNull().default(true),
  ...auditColumns,
});

export const OrganizationsRelations = relations(Organizations, ({ many }) => ({
  memberships: many(Memberships),
}));

export type Organization = typeof Organizations.$inferSelect;
export type NewOrganization = typeof Organizations.$inferInsert;
