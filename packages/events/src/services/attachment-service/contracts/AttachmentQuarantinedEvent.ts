import { defineEvent } from "../../../cloud-events";
import { AttachmentQuarantinedDataSchema } from "../schemas";

export const AttachmentQuarantinedEvent = defineEvent({
  type: "attachment.attachment.quarantined",
  version: 1,
  schema: AttachmentQuarantinedDataSchema,
});
