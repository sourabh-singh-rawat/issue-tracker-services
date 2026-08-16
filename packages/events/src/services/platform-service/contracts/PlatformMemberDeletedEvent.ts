import { defineEvent } from "../../../cloud-events";
import { PlatformMemberDeletedDataSchema } from "../schemas";

export const PlatformMemberDeletedEvent = defineEvent({
  type: "platform.platform-member.deleted",
  version: 1,
  schema: PlatformMemberDeletedDataSchema,
});
