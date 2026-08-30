import { defineEvent } from "../../../cloud-events";
import { ProfileDeletedDataSchema } from "../schemas";

export const ProfileDeletedEvent = defineEvent({
  type: "identity.profile.deleted",
  version: 1,
  schema: ProfileDeletedDataSchema,
});
