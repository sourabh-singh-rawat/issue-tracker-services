import type {
  Attachment,
  AttachmentVersion,
  NewAttachment,
  NewAttachmentVersion,
} from "@/db";

export type AttachmentRepositoryOptions = { tx?: unknown };

export interface IAttachmentRepository {
  save: (entity: NewAttachment, options?: AttachmentRepositoryOptions) => Promise<Attachment>;
  saveVersion: (
    entity: NewAttachmentVersion,
    options?: AttachmentRepositoryOptions,
  ) => Promise<AttachmentVersion>;
  findById: (id: string, options?: AttachmentRepositoryOptions) => Promise<Attachment | null>;
  findByIssueId: (
    issueId: string,
    options?: AttachmentRepositoryOptions,
  ) => Promise<{ rows: Attachment[]; rowCount: number }>;
  deleteById: (id: string, options?: AttachmentRepositoryOptions) => Promise<void>;
}
