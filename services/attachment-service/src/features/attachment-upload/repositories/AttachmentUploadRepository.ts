import { eq } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import {
  type AttachmentUpload,
  AttachmentUploads,
  type Database,
  type NewAttachmentUpload,
} from "@/db";
import type {
  AttachmentUploadRepositoryOptions,
  IAttachmentUploadRepository,
} from "@/features/attachment-upload/repositories/IAttachmentUploadRepository";

@injectable()
export class AttachmentUploadRepository implements IAttachmentUploadRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  async save(
    entity: NewAttachmentUpload,
    options?: AttachmentUploadRepositoryOptions,
  ): Promise<AttachmentUpload> {
    const client = this.client(options);
    const [created] = await client.insert(AttachmentUploads).values(entity).returning();

    return created;
  }

  async findById(
    id: string,
    options?: AttachmentUploadRepositoryOptions,
  ): Promise<AttachmentUpload | null> {
    const client = this.client(options);
    const [row] = await client
      .select()
      .from(AttachmentUploads)
      .where(eq(AttachmentUploads.id, id))
      .limit(1);

    return row ?? null;
  }

  async markCompleted(id: string, options?: AttachmentUploadRepositoryOptions): Promise<void> {
    const client = this.client(options);
    await client
      .update(AttachmentUploads)
      .set({ status: "COMPLETED", completedAt: new Date() })
      .where(eq(AttachmentUploads.id, id));
  }

  async markFailed(id: string, options?: AttachmentUploadRepositoryOptions): Promise<void> {
    const client = this.client(options);
    await client
      .update(AttachmentUploads)
      .set({ status: "FAILED" })
      .where(eq(AttachmentUploads.id, id));
  }

  private client(options?: AttachmentUploadRepositoryOptions) {
    return options?.tx ?? this.db;
  }
}
