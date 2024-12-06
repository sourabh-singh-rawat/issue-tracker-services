import { PaginatedOutput } from "@issue-tracker/common";
import { ServiceOptions } from "@issue-tracker/orm";
import { Attachment } from "../../../data";

export interface CreateAttachmentOptions {
  itemId: string;
  userId: string;
  file: Buffer;
  filename: string;
  mimetype: string;
}

export interface DeleteAttachmentOptions extends ServiceOptions {
  id: string;
}

export interface AttachmentService {
  createAttachment(options: CreateAttachmentOptions): Promise<void>;
  findAttachments(id: string): Promise<PaginatedOutput<Attachment>>;
  deleteAttachment(options: DeleteAttachmentOptions): Promise<void>;
}
