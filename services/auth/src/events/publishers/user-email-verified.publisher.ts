import {
  EventBus,
  Publisher,
  SUBJECTS,
  Subjects,
  UserEmailVerifiedPayload,
} from "@issue-tracker/event-bus";

export class UserEmailVerifiedPublisher extends Publisher<{
  payload: UserEmailVerifiedPayload;
  subject: Subjects;
}> {
  subject = SUBJECTS.USER_EMAIL_VERIFIED;

  constructor(eventBus: EventBus) {
    super(eventBus.client);
  }
}
