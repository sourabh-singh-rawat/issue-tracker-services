import { defineEvent } from "../../../cloud-events";
import { PlatformRelationCreatedDataSchema } from "../schemas";

export const PlatformRelationCreatedEvent = defineEvent({
  type: "platform.platform-relation.created",
  version: 1,
  schema: PlatformRelationCreatedDataSchema,
});
