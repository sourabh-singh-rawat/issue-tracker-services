import { and, eq, isNull } from "drizzle-orm";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { type Attachment, Attachments, type Database, type NewAttachment } from "@/db";
import type {
  AttachmentRepositoryOptions,
  IAttachmentRepository,
} from "@/features/attachment/repositories/IAttachmentRepository";

@injectable()
export class AttachmentRepository implements IAttachmentRepository {
  constructor(@inject(TYPES.Database) private readonly db: Database) {}

  private client(options?: AttachmentRepositoryOptions) {
    return options?.tx ?? this.db;
  }

  async save(entity: NewAttachment, options?: AttachmentRepositoryOptions): Promise<Attachment> {
    const client = this.client(options);
    const now = new Date();

    const [created] = await client
      .insert(Attachments)
      .values({
        ...entity,
        createdAt: entity.createdAt ?? now,
        version: entity.version ?? 1,
      })
      .returning();

    return created;
  }

  async findById(id: string, options?: AttachmentRepositoryOptions): Promise<Attachment | null> {
    const client = this.client(options);
    const [row] = await client
      .select()
      .from(Attachments)
      .where(and(eq(Attachments.id, id), isNull(Attachments.deletedAt)))
      .limit(1);

    return row ?? null;
  }

  async findByIssueId(
    issueId: string,
    options?: AttachmentRepositoryOptions,
  ): Promise<{ rows: Attachment[]; rowCount: number }> {
    const client = this.client(options);
    const rows = await client
      .select()
      .from(Attachments)
      .where(and(eq(Attachments.issueId, issueId), isNull(Attachments.deletedAt)));

    return { rows, rowCount: rows.length };
  }

  async deleteById(id: string, options?: AttachmentRepositoryOptions): Promise<void> {
    const client = this.client(options);
    await client.delete(Attachments).where(eq(Attachments.id, id));
  }
}
