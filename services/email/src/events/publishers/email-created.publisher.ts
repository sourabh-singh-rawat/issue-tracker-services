import {
  EmailCreatedPayload,
  EventBus,
  Publisher,
  Subjects,
} from "@issue-tracker/event-bus";

export class EmailCreatedPublisher extends Publisher<{
  subject: Subjects.EMAIL_CREATED;
  payload: EmailCreatedPayload;
}> {
  readonly subject = Subjects.EMAIL_CREATED;

  constructor(eventBus: EventBus) {
    super(eventBus.client);
  }
}
