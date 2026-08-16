import { pgTable, varchar } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";

export const Identities = pgTable("identities", {
  ...idColumn,
  displayName: varchar("display_name", { length: 255 }),
  ...auditColumns,
});

export type Identity = typeof Identities.$inferSelect;
export type NewIdentity = typeof Identities.$inferInsert;
