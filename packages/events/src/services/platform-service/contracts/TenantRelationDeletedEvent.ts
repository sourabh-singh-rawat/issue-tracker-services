import { defineEvent } from "../../../cloud-events";
import { TenantRelationDeletedDataSchema } from "../schemas";

export const TenantRelationDeletedEvent = defineEvent({
  type: "platform.tenant-relation.deleted",
  version: 1,
  schema: TenantRelationDeletedDataSchema,
});
