import { defineEvent } from "../../../cloud-events";
import { AttachmentScannedDataSchema } from "../schemas";

export const AttachmentScannedEvent = defineEvent({
  type: "attachment.attachment.scanned",
  version: 1,
  schema: AttachmentScannedDataSchema,
});
