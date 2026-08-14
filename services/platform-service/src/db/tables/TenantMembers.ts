import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import { auditColumns, idColumn } from "@/db/columns";
import { TenantRoles } from "@/db/tables/TenantRoles";
import { Tenants } from "@/db/tables/Tenants";

export const TenantMembers = pgTable(
  "tenant_members",
  {
    ...idColumn,
    tenantId: uuid("tenant_id")
      .notNull()
      .references(() => Tenants.id),
    roleId: uuid("role_id").notNull(),
    identityId: uuid("identity_id").notNull(),
    assignedBy: uuid("assigned_by"),
    assignedAt: timestamp("assigned_at", { withTimezone: true }).notNull().defaultNow(),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    reason: text("reason"),
    ...auditColumns,
  },
  (table) => [unique().on(table.tenantId, table.identityId, table.roleId)],
);

export const TenantMembersRelations = relations(TenantMembers, ({ one }) => ({
  tenant: one(Tenants, {
    fields: [TenantMembers.tenantId],
    references: [Tenants.id],
  }),
  tenantRole: one(TenantRoles, {
    fields: [TenantMembers.roleId],
    references: [TenantRoles.roleId],
  }),
}));

export type TenantMember = typeof TenantMembers.$inferSelect;
export type NewTenantMember = typeof TenantMembers.$inferInsert;
