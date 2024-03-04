import {
  NatsMessenger,
  Publisher,
  Subjects,
  IssueCreatedPayload,
} from "@sourabhrawatcc/core-utils";

export class IssueCreatedPublisher extends Publisher<{
  payload: IssueCreatedPayload;
  subject: Subjects;
}> {
  subject = Subjects.ISSUE_CREATED;

  constructor(private readonly messenger: NatsMessenger) {
    super(messenger.client);
  }
}
