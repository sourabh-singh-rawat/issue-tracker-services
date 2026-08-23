import type { Attachment, DbClient } from "@/db";

export type CreateAttachmentFromUploadInput = {
  tenantId: string;
  filename: string;
  contentType: string;
  data: Buffer | Uint8Array;
  storageProvider: string;
  storageObjectKey: string;
  operationId?: string;
  metadata?: Record<string, unknown>;
  createdBy: string;
  tx?: DbClient;
};

export type DeleteAttachmentOptions = {
  id: string;
  tx?: DbClient;
};

export interface IAttachmentService {
  createFromUpload: (input: CreateAttachmentFromUploadInput) => Promise<Attachment>;
  delete: (options: DeleteAttachmentOptions) => Promise<void>;
}
