import { defineEvent } from "../../../cloud-events";
import { PlatformMemberCreatedDataSchema } from "../schemas";

export const PlatformMemberCreatedEvent = defineEvent({
  type: "platform.platform-member.created",
  version: 1,
  schema: PlatformMemberCreatedDataSchema,
});
