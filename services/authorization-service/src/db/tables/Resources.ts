import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { idColumn } from "@/db/columns";

export const Resources = pgTable("resources", {
  ...idColumn,
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description"),
  isSystem: boolean("is_system").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const ResourcesRelations = relations(Resources, () => ({}));

export type Resource = typeof Resources.$inferSelect;
export type NewResource = typeof Resources.$inferInsert;
