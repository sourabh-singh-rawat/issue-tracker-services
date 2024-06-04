import {
  EventBus,
  Publisher,
  Subjects,
  UserCreatedPayload,
} from "@issue-tracker/event-bus";

export class UserCreatedPublisher extends Publisher<{
  payload: UserCreatedPayload;
  subject: Subjects;
}> {
  subject = Subjects.USER_CREATED;

  constructor(eventBus: EventBus) {
    super(eventBus.client);
  }
}
