import { PaginatedAttachment } from "../CoreAttachmentResolver";

export interface AttachmentResolver {
  findAttachments(itemId: string): Promise<PaginatedAttachment>;
}
