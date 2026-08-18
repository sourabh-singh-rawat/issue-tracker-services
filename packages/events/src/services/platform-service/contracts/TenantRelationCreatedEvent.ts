import { defineEvent } from "../../../cloud-events";
import { TenantRelationCreatedDataSchema } from "../schemas";

export const TenantRelationCreatedEvent = defineEvent({
  type: "platform.tenant-relation.created",
  version: 1,
  schema: TenantRelationCreatedDataSchema,
});
