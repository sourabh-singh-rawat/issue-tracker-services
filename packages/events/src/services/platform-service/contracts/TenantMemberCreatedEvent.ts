import { defineEvent } from "../../../cloud-events";
import { TenantMemberCreatedDataSchema } from "../schemas";

export const TenantMemberCreatedEvent = defineEvent({
  type: "platform.tenant-member.created",
  version: 2,
  schema: TenantMemberCreatedDataSchema,
});
