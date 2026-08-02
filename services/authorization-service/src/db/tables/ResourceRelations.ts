import { index, pgTable, unique, varchar } from "drizzle-orm/pg-core";
import { idColumn } from "@/db/columns";

export const ResourceRelations = pgTable(
  "resource_relations",
  {
    ...idColumn,
    resourceType: varchar("resource_type", { length: 100 }).notNull(),
    key: varchar("key", { length: 100 }).notNull(),
  },
  (table) => [
    unique("resource_relations_type_key_unique").on(table.resourceType, table.key),
    index("resource_relations_resource_type_idx").on(table.resourceType),
  ],
);

export type ResourceRelation = typeof ResourceRelations.$inferSelect;
export type NewResourceRelation = typeof ResourceRelations.$inferInsert;
