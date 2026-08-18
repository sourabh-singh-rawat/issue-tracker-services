import { defineEvent } from "../../../cloud-events";
import { ProfileGenderUpdatedDataSchema } from "../schemas";

export const ProfileGenderUpdatedEvent = defineEvent({
  type: "identity.profile.gender-updated",
  version: 1,
  schema: ProfileGenderUpdatedDataSchema,
});
