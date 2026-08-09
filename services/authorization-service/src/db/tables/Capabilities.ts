import { relations } from "drizzle-orm";
import { index, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { idColumn } from "@/db/columns";
import { RoleCapabilities } from "@/db/tables/RoleCapabilities";

export const Capabilities = pgTable(
  "capabilities",
  {
    ...idColumn,
    key: varchar("key", { length: 255 }).notNull().unique(),
    service: varchar("service", { length: 100 }).notNull(),
    resource: varchar("resource", { length: 100 }).notNull(),
    action: varchar("action", { length: 100 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("capabilities_service_idx").on(table.service),
    index("capabilities_service_resource_idx").on(table.service, table.resource),
  ],
);

export const CapabilitiesRelations = relations(Capabilities, ({ many }) => ({
  roleCapabilities: many(RoleCapabilities),
}));

export type Capability = typeof Capabilities.$inferSelect;
export type NewCapability = typeof Capabilities.$inferInsert;
