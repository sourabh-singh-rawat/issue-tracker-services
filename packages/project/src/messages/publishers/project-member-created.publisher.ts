import {
  NatsMessenger,
  Publisher,
  Subjects,
  ProjectMemberPayload,
} from "@sourabhrawatcc/core-utils";

export class ProjectMemberCreatedPublisher extends Publisher<{
  payload: ProjectMemberPayload;
  subject: Subjects;
}> {
  subject = Subjects.PROJECT_MEMBERS_CREATED;

  constructor(messenger: NatsMessenger) {
    super(messenger.client);
  }
}
