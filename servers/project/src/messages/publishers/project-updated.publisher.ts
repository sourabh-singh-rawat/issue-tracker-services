import {
  MessageService,
  Publisher,
  Subjects,
  ProjectPayload,
} from "@sourabhrawatcc/core-utils";

export class ProjectUpdatedPublisher extends Publisher<{
  payload: ProjectPayload;
  subject: Subjects;
}> {
  subject = Subjects.PROJECT_UPDATED;

  constructor(messageService: MessageService) {
    super(messageService.client);
  }
}
