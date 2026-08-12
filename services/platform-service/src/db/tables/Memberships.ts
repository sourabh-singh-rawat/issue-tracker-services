import { relations } from "drizzle-orm";
import { pgTable, unique, uuid } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";
import { MembershipRoles } from "@/db/tables/MembershipRoles";
import { Tenants } from "@/db/tables/Tenants";

export const Memberships = pgTable(
  "memberships",
  {
    ...idColumn,
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => Tenants.id),
    identityId: uuid("identity_id").notNull(),
    ...auditColumns,
  },
  (table) => [unique().on(table.tenantId, table.identityId)],
);

export const MembershipsRelations = relations(Memberships, ({ one, many }) => ({
  tenant: one(Tenants, {
    fields: [Memberships.tenantId],
    references: [Tenants.id],
  }),
  membershipRoles: many(MembershipRoles),
}));

export type Membership = typeof Memberships.$inferSelect;
export type NewMembership = typeof Memberships.$inferInsert;
