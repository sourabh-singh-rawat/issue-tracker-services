import type { AttachmentUpload, DbClient, NewAttachmentUpload } from "@/db";

export type AttachmentUploadRepositoryOptions = { tx?: DbClient };

export interface IAttachmentUploadRepository {
  save: (
    entity: NewAttachmentUpload,
    options?: AttachmentUploadRepositoryOptions,
  ) => Promise<AttachmentUpload>;
  markFailed: (id: string, options?: AttachmentUploadRepositoryOptions) => Promise<void>;
}