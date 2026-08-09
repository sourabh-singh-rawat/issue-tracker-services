import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { idColumn } from "@/db/columns";

export const Units = pgTable("units", {
  ...idColumn,
  code: varchar("code", { length: 50 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  symbol: varchar("symbol", { length: 50 }),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export type Unit = typeof Units.$inferSelect;
export type NewUnit = typeof Units.$inferInsert;
