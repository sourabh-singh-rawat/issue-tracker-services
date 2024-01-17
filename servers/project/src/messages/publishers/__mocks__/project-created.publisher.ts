import {
  Publisher,
  Subjects,
  ProjectPayload,
  NatsMessenger,
} from "@sourabhrawatcc/core-utils";

export class ProjectCreatedPublisher extends Publisher<{
  payload: ProjectPayload;
  subject: Subjects;
}> {
  constructor(private readonly messenger: NatsMessenger) {
    super(messenger.client);
  }

  subject = Subjects.PROJECT_CREATED;

  publish = jest.fn();
}
