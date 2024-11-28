import { ServiceOptions } from "@issue-tracker/orm";
import { PaginatedAttachment } from "../CoreAttachmentResolver";

export interface DeleteAttachmentOptions extends ServiceOptions {
  id: string;
}

export interface AttachmentResolver {
  findAttachments(itemId: string): Promise<PaginatedAttachment>;
  deleteAttachment(id: string): Promise<string>;
}
