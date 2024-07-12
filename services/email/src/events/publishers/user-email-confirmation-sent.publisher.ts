import {
  EventBus,
  Publisher,
  Subjects,
  SUBJECTS,
  UserEmailConfirmationSentPayload,
} from "@issue-tracker/event-bus";

export class UserEmailConfirmationSentPublisher extends Publisher<{
  subject: Subjects;
  payload: UserEmailConfirmationSentPayload;
}> {
  readonly subject = SUBJECTS.USER_CONFIRMATION_EMAIL_SENT;

  constructor(eventBus: EventBus) {
    super(eventBus.client);
  }
}
