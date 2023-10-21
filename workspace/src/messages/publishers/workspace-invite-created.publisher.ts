import {
  Publisher,
  Subjects,
  MessageService,
  WorkspaceInvitePayload,
} from "@sourabhrawatcc/core-utils";

export class WorkspaceInviteCreatedPublisher extends Publisher<{
  payload: WorkspaceInvitePayload;
  subject: Subjects;
}> {
  subject = Subjects.WORKSPACE_INVITE_CREATED;

  constructor(messageService: MessageService) {
    super(messageService.client);
  }
}
