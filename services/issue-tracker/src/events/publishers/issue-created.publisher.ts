import {
  EventBus,
  IssueCreatedPayload,
  Publisher,
  SUBJECTS,
  Subjects,
} from "@issue-tracker/event-bus";

export class IssueCreatedPublisher extends Publisher<{
  payload: IssueCreatedPayload;
  subject: Subjects;
}> {
  subject = SUBJECTS.ISSUE_CREATED;

  constructor(private readonly eventBus: EventBus) {
    super(eventBus.client);
  }
}
