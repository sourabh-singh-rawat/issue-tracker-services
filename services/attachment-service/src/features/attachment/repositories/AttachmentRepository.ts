import { eq } from "drizzle-orm";
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

    const [created] = await client.insert(Attachments).values(entity).returning();

    return created;
  }

  async findById(id: string, options?: AttachmentRepositoryOptions): Promise<Attachment | null> {
    const client = this.client(options);
    const [row] = await client.select().from(Attachments).where(eq(Attachments.id, id)).limit(1);

    return row ?? null;
  }

  async findByIssueId(
    _issueId: string,
    _options?: AttachmentRepositoryOptions,
  ): Promise<{ rows: Attachment[]; rowCount: number }> {
    return { rows: [], rowCount: 0 };
  }

  async deleteById(id: string, options?: AttachmentRepositoryOptions): Promise<void> {
    const client = this.client(options);
    await client.delete(Attachments).where(eq(Attachments.id, id));
  }
}
