import { defineEvent } from "../../../cloud-events";
import { TenantCreatedDataSchema } from "../schemas";

export const TenantCreatedEvent = defineEvent({
  type: "platform.tenant.created",
  version: 1,
  schema: TenantCreatedDataSchema,
});
