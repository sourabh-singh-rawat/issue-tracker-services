import { defineEvent } from "../../../cloud-events";
import { AttachmentCreatedDataSchema } from "../schemas";

export const AttachmentCreatedEvent = defineEvent({
  type: "attachment.attachment.created",
  version: 1,
  schema: AttachmentCreatedDataSchema,
});
