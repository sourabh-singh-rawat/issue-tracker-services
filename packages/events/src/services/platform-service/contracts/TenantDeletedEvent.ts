import { defineEvent } from "../../../cloud-events";
import { TenantDeletedDataSchema } from "../schemas";

export const TenantDeletedEvent = defineEvent({
  type: "platform.tenant.deleted",
  version: 2,
  schema: TenantDeletedDataSchema,
});
