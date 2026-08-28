import { and, eq } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { type AttachmentScan, AttachmentScans, type Database } from "@/db";
import type { AttachmentScanStatus, AttachmentScanType } from "@/constants";
import type {
  AttachmentScanRepositoryOptions,
  CreateAttachmentScanEntity,
  IAttachmentScanRepository,
  UpdateAttachmentScanResultInput,
} from "./IAttachmentScanRepository";

@injectable()
export class AttachmentScanRepository implements IAttachmentScanRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  async save(
    entity: CreateAttachmentScanEntity,
    options?: AttachmentScanRepositoryOptions,
  ): Promise<AttachmentScan> {
    const client = this.client(options);

    const [created] = await client
      .insert(AttachmentScans)
      .values({
        id: entity.id,
        attachmentId: entity.attachmentId,
        versionId: entity.versionId,
        scopeType: entity.scopeType,
        scopeId: entity.scopeId,
        tenantId: entity.tenantId,
        type: entity.type,
        status: entity.status,
        storageProvider: entity.storageProvider,
        storageObjectKey: entity.storageObjectKey,
      })
      .returning();

    return created;
  }

  async findById(
    id: string,
    options?: AttachmentScanRepositoryOptions,
  ): Promise<AttachmentScan | null> {
    const client = this.client(options);
    const [row] = await client
      .select()
      .from(AttachmentScans)
      .where(eq(AttachmentScans.id, id))
      .limit(1);

    return row ?? null;
  }

  async findByAttachmentAndVersion(
    attachmentId: string,
    versionId: string,
    type?: AttachmentScanType,
    options?: AttachmentScanRepositoryOptions,
  ): Promise<AttachmentScan | null> {
    const client = this.client(options);
    const conditions = [
      eq(AttachmentScans.attachmentId, attachmentId),
      eq(AttachmentScans.versionId, versionId),
    ];

    if (type) {
      conditions.push(eq(AttachmentScans.type, type));
    }

    const [row] = await client
      .select()
      .from(AttachmentScans)
      .where(and(...conditions))
      .limit(1);

    return row ?? null;
  }

  async updateResult(
    id: string,
    input: UpdateAttachmentScanResultInput,
    options?: AttachmentScanRepositoryOptions,
  ): Promise<AttachmentScan | null> {
    const client = this.client(options);
    const now = new Date();

    const [updated] = await client
      .update(AttachmentScans)
      .set({
        status: input.status,
        scanner: input.scanner,
        durationMs: input.durationMs,
        result: input.result,
        metadata: input.metadata,
        scannedAt: now,
        updatedAt: now,
      })
      .where(eq(AttachmentScans.id, id))
      .returning();

    return updated ?? null;
  }

  async updateStatus(
    id: string,
    status: AttachmentScanStatus,
    options?: AttachmentScanRepositoryOptions,
  ): Promise<AttachmentScan | null> {
    const client = this.client(options);
    const now = new Date();

    const [updated] = await client
      .update(AttachmentScans)
      .set({
        status,
        scannedAt: now,
        updatedAt: now,
      })
      .where(eq(AttachmentScans.id, id))
      .returning();

    return updated ?? null;
  }

  private client(options?: AttachmentScanRepositoryOptions) {
    return options?.tx ?? this.db;
  }
}
