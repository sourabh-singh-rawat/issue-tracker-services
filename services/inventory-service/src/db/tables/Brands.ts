import { boolean, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";

export const Brands = pgTable("brands", {
  ...idColumn,
  code: varchar("code", { length: 50 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  isActive: boolean("is_active").notNull().default(true),
  ...auditColumns,
});

export type Brand = typeof Brands.$inferSelect;
export type NewBrand = typeof Brands.$inferInsert;
