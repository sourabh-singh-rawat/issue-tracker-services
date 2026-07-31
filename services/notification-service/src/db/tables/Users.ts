import { pgTable } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";

export const Users = pgTable("users", {
  ...idColumn,
  ...auditColumns,
});

export type User = typeof Users.$inferSelect;
export type NewUser = typeof Users.$inferInsert;
