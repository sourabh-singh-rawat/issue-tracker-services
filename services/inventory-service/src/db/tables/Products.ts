import { boolean, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";

export const Products = pgTable("products", {
  ...idColumn,
  code: varchar("code", { length: 50 }).notNull().unique(),
  sku: varchar("sku", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  productType: varchar("product_type", { length: 50 }).notNull(),
  categoryId: uuid("category_id"),
  brandId: uuid("brand_id"),
  defaultUnitId: uuid("default_unit_id").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  ...auditColumns,
});

export type Product = typeof Products.$inferSelect;
export type NewProduct = typeof Products.$inferInsert;
