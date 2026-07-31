import { PaginatedOutput } from "@pine/common";
import type { Attachment, DbClient } from "@/db";

export interface CreateAttachmentOptions {
  issueId: string;
  userId: string;
  file: Buffer;
  filename: string;
  mimetype: string;
}

export interface DeleteAttachmentOptions {
  id: string;
  tx?: DbClient;
}

export interface AttachmentService {
  createAttachment(options: CreateAttachmentOptions): Promise<void>;
  findAttachments(id: string): Promise<PaginatedOutput<Attachment>>;
  deleteAttachment(options: DeleteAttachmentOptions): Promise<void>;
}
