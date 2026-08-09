import { relations } from "drizzle-orm";
import { boolean, numeric, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { idColumn } from "@/db/columns";
import { Products } from "@/db/tables/Products";
import { Units } from "@/db/tables/Units";

export const ProductUnits = pgTable("product_units", {
  ...idColumn,
  productId: uuid("product_id").notNull(),
  unitId: uuid("unit_id").notNull(),
  baseUnitMultiplier: numeric("base_unit_multiplier", { precision: 18, scale: 6 }).notNull(),
  isBaseUnit: boolean("is_base_unit").notNull().default(false),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const ProductUnitsRelations = relations(ProductUnits, ({ one }) => ({
  product: one(Products, {
    fields: [ProductUnits.productId],
    references: [Products.id],
  }),
  unit: one(Units, {
    fields: [ProductUnits.unitId],
    references: [Units.id],
  }),
}));

export type ProductUnit = typeof ProductUnits.$inferSelect;
export type NewProductUnit = typeof ProductUnits.$inferInsert;
