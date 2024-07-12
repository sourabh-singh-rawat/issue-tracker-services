import {
  EventBus,
  Publisher,
  Subjects,
  SUBJECTS,
  UserRegisteredPayload,
} from "@issue-tracker/event-bus";

export class UserRegisteredPublisher extends Publisher<{
  payload: UserRegisteredPayload;
  subject: Subjects;
}> {
  subject = SUBJECTS.USER_REGISTERED;

  constructor(eventBus: EventBus) {
    super(eventBus.client);
  }
}
