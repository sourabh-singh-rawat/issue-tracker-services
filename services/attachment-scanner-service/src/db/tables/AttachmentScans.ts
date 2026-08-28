import { integer, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { idColumn } from "@/db/columns";
import type { AttachmentScanStatus, AttachmentScanType } from "@/constants";

export type MalwareScanResult = {
  isInfected: boolean;
  threats: string[];
  rawOutput?: string;
};

export type ContentScanResult = {
  flagged?: boolean;
  categories?: string[];
  scores?: Record<string, number>;
  rawOutput?: string;
};

export type AttachmentScanResult = MalwareScanResult | ContentScanResult | Record<string, unknown>;

export const AttachmentScans = pgTable("attachment_scans", {
  ...idColumn,
  attachmentId: uuid("attachment_id").notNull(),
  versionId: uuid("version_id").notNull(),
  scopeType: text("scope_type"),
  scopeId: uuid("scope_id"),
  tenantId: uuid("tenant_id"),
  type: text("type").$type<AttachmentScanType>().notNull(),
  status: text("status").$type<AttachmentScanStatus>().notNull(),
  scanner: text("scanner"),
  durationMs: integer("duration_ms"),
  result: jsonb("result").$type<AttachmentScanResult>(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  storageProvider: text("storage_provider"),
  storageObjectKey: text("storage_object_key"),
  scannedAt: timestamp("scanned_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export type AttachmentScan = typeof AttachmentScans.$inferSelect;
export type NewAttachmentScan = typeof AttachmentScans.$inferInsert;
