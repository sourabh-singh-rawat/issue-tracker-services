import {
  EventBus,
  IssueCreatedPayload,
  Publisher,
  Subjects,
} from "@issue-tracker/event-bus";

export class IssueCreatedPublisher extends Publisher<{
  payload: IssueCreatedPayload;
  subject: Subjects;
}> {
  subject = Subjects.ISSUE_CREATED;

  constructor(private readonly eventBus: EventBus) {
    super(eventBus.client);
  }
}
