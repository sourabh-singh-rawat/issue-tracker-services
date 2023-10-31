import {
  MessageService,
  Publisher,
  Subjects,
  WorkspaceCreatedPayload,
} from "@sourabhrawatcc/core-utils";

export class WorkspaceCreatedPublisher extends Publisher<{
  payload: WorkspaceCreatedPayload;
  subject: Subjects;
}> {
  subject = Subjects.WORKSPACE_CREATED;

  constructor(messageService: MessageService) {
    super(messageService.client);
  }
}
