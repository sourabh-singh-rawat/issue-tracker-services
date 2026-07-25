import { defineEvent } from "../../../cloud-events";
import { UserRegisteredDataSchema } from "../schemas";

export const UserRegisteredEvent = defineEvent({
  type: "identity.user.registered",
  version: 1,
  schema: UserRegisteredDataSchema,
});
