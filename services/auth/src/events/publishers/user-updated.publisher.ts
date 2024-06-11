import {
  EventBus,
  Publisher,
  Subjects,
  UserUpdatedPayload,
} from "@issue-tracker/event-bus";

export class UserUpdatedPublisher extends Publisher<{
  payload: UserUpdatedPayload;
  subject: Subjects;
}> {
  subject = Subjects.USER_UPDATED;

  constructor(eventBus: EventBus) {
    super(eventBus.client);
  }
}
