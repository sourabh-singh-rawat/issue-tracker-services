import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { idColumn } from "@/db/columns";
import { Identities } from "@/db/tables/Identities";
import { Tenants } from "@/db/tables/Tenants";
import type { AttachmentSecurityStatus, AttachmentStatus } from "@/features/attachment/constants";

export const Attachments = pgTable("attachments", {
  ...idColumn,
  tenantId: uuid("tenant_id")
    .notNull()
    .references(() => Tenants.id),
  currentVersionId: uuid("current_version_id"),
  operationId: uuid("operation_id"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  status: text("status").$type<AttachmentStatus>().notNull(),
  securityStatus: text("security_status").$type<AttachmentSecurityStatus>().notNull(),
  createdBy: uuid("created_by")
    .notNull()
    .references(() => Identities.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export type Attachment = typeof Attachments.$inferSelect;
export type NewAttachment = typeof Attachments.$inferInsert;
