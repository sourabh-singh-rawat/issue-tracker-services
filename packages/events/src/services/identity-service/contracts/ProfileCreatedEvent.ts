import { defineEvent } from "../../../cloud-events";
import { ProfileCreatedDataSchema } from "../schemas";

export const ProfileCreatedEvent = defineEvent({
  type: "identity.profile.created",
  version: 1,
  schema: ProfileCreatedDataSchema,
});
