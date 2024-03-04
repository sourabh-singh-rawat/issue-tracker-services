import {
  NatsMessenger,
  Publisher,
  Subjects,
  ProjectPayload,
} from "@sourabhrawatcc/core-utils";

export class ProjectUpdatedPublisher extends Publisher<{
  payload: ProjectPayload;
  subject: Subjects;
}> {
  subject = Subjects.PROJECT_UPDATED;

  constructor(messenger: NatsMessenger) {
    super(messenger.client);
  }
}
