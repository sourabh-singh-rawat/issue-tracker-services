import type { PaginatedOutput } from "@pine/common";
import type { Attachment, DbClient } from "@/db";

export type CreateAttachmentFromUploadInput = {
  tenantId: string;
  filename: string;
  contentType: string;
  data: Buffer | Uint8Array;
  storageProvider: string;
  storageObjectKey: string;
  createdBy: string;
  tx?: DbClient;
};

export type CreateAttachmentOptions = {
  issueId: string;
  userId: string;
  file: Buffer;
  filename: string;
  mimetype: string;
};

export type DeleteAttachmentOptions = {
  id: string;
  tx?: DbClient;
};

export interface IAttachmentService {
  createFromUpload: (input: CreateAttachmentFromUploadInput) => Promise<Attachment>;
  create: (options: CreateAttachmentOptions) => Promise<void>;
  findByIssueId: (issueId: string) => Promise<PaginatedOutput<Attachment>>;
  delete: (options: DeleteAttachmentOptions) => Promise<void>;
}
