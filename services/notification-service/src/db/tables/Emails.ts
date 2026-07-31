import { pgTable, text } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";

export const Emails = pgTable("emails", {
  ...idColumn,
  type: text("type").notNull(),
  email: text("email").notNull(),
  status: text("status").notNull().default("Pending"),
  message: text("message").notNull(),
  ...auditColumns,
});

export type Email = typeof Emails.$inferSelect;
export type NewEmail = typeof Emails.$inferInsert;
