import { defineEvent } from "../../../cloud-events";
import { IdentityEmailVerifiedDataSchema } from "../schemas";

export const IdentityEmailVerifiedEvent = defineEvent({
  type: "identity.user.email-verified",
  version: 2,
  schema: IdentityEmailVerifiedDataSchema,
});
