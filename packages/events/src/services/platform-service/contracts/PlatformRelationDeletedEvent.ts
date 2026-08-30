import { defineEvent } from "../../../cloud-events";
import { PlatformRelationDeletedDataSchema } from "../schemas";

export const PlatformRelationDeletedEvent = defineEvent({
  type: "platform.platform-relation.deleted",
  version: 1,
  schema: PlatformRelationDeletedDataSchema,
});
