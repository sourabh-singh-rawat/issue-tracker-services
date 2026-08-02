import { relations } from "drizzle-orm";
import { boolean, index, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { idColumn } from "@/db/columns";
import { RoleResources } from "@/db/tables/RoleResources";

export const Resources = pgTable(
  "resources",
  {
    ...idColumn,
    type: varchar("type", { length: 100 }).notNull(),
    key: varchar("key", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    isStatic: boolean("is_static").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [index("resources_type_idx").on(table.type)],
);

export const ResourcesRelations = relations(Resources, ({ many }) => ({
  roleResources: many(RoleResources),
}));

export type Resource = typeof Resources.$inferSelect;
export type NewResource = typeof Resources.$inferInsert;
