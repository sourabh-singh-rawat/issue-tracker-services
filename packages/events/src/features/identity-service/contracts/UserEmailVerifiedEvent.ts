import { defineEvent } from "../../cloud-events/utils";
import { UserEmailVerifiedDataSchema } from "../schemas";

export const UserEmailVerifiedEvent = defineEvent({
  type: "identity.user.email-verified",
  version: 1,
  schema: UserEmailVerifiedDataSchema,
});
