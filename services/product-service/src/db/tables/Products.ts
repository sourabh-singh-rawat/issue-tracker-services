import { relations } from "drizzle-orm";
import { boolean, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";
import { Brands } from "@/db/tables/Brands";
import { Categories } from "@/db/tables/Categories";
import { ProductUnits } from "@/db/tables/ProductUnits";
import { Units } from "@/db/tables/Units";

export const Products = pgTable("products", {
  ...idColumn,
  code: varchar("code", { length: 50 }).notNull().unique(),
  sku: varchar("sku", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  productType: varchar("product_type", { length: 50 }).notNull(),
  categoryId: uuid("category_id"),
  brandId: uuid("brand_id"),
  defaultUnitId: uuid("default_unit_id"),
  isActive: boolean("is_active").notNull().default(true),
  ...auditColumns,
});

export const ProductsRelations = relations(Products, ({ one, many }) => ({
  category: one(Categories, {
    fields: [Products.categoryId],
    references: [Categories.id],
  }),
  brand: one(Brands, {
    fields: [Products.brandId],
    references: [Brands.id],
  }),
  defaultUnit: one(Units, {
    fields: [Products.defaultUnitId],
    references: [Units.id],
  }),
  productUnits: many(ProductUnits),
}));

export type Product = typeof Products.$inferSelect;
export type NewProduct = typeof Products.$inferInsert;
