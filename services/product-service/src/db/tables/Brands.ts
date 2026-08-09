import { boolean, integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { idColumn } from "@/db/columns";

export const Brands = pgTable("brands", {
  ...idColumn,
  code: varchar("code", { length: 50 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
  version: integer("version").notNull().default(1),
});

export type Brand = typeof Brands.$inferSelect;
export type NewBrand = typeof Brands.$inferInsert;
