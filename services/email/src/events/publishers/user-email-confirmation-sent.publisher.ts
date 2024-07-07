import {
  EventBus,
  Publisher,
  Subjects,
  UserEmailConfirmationSentPayload,
} from "@issue-tracker/event-bus";

export class UserEmailConfirmationSentPublisher extends Publisher<{
  subject: Subjects.USER_CONFIRMATION_EMAIL_SENT;
  payload: UserEmailConfirmationSentPayload;
}> {
  readonly subject = Subjects.USER_CONFIRMATION_EMAIL_SENT;

  constructor(eventBus: EventBus) {
    super(eventBus.client);
  }
}
