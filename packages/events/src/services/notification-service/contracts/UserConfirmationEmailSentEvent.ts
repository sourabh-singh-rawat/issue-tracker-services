import { defineEvent } from "../../../cloud-events";
import { UserConfirmationEmailSentDataSchema } from "../schemas";

export const UserConfirmationEmailSentEvent = defineEvent({
  type: "mail.user.confirmation-email-sent",
  version: 1,
  schema: UserConfirmationEmailSentDataSchema,
});
