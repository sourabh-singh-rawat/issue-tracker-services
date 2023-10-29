import {
  MessageService,
  Publisher,
  Subjects,
  ProjectPayload,
} from "@sourabhrawatcc/core-utils";

export class ProjectCreatedPublisher extends Publisher<{
  payload: ProjectPayload;
  subject: Subjects;
}> {
  subject = Subjects.PROJECT_CREATED;

  constructor(messageService: MessageService) {
    super(messageService.client);
  }
}
