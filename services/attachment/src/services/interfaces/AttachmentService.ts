import { PaginatedOutput } from "@issue-tracker/common";
import { Attachment } from "../../data/entities";

export interface CreateAttachmentOptions {
  itemId: string;
  userId: string;
  file: Buffer;
  filename: string;
  mimetype: string;
}

export interface AttachmentService {
  createAttachment(options: CreateAttachmentOptions): Promise<void>;
  findAttachments(id: string): Promise<PaginatedOutput<Attachment>>;
}
