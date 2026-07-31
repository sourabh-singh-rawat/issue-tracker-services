import type { Attachment, DbClient, NewAttachment } from "@/db";

export type AttachmentRepositoryOptions = { tx?: DbClient };

export interface IAttachmentRepository {
  save(
    entity: NewAttachment,
    options?: AttachmentRepositoryOptions,
  ): Promise<Attachment>;
  findById(id: string, options?: AttachmentRepositoryOptions): Promise<Attachment | null>;
  findByIssueId(
    issueId: string,
    options?: AttachmentRepositoryOptions,
  ): Promise<{ rows: Attachment[]; rowCount: number }>;
  deleteById(id: string, options?: AttachmentRepositoryOptions): Promise<void>;
}
