import {
  Publisher,
  Subjects,
  Messenger,
  WorkspaceInvitePayload,
} from "@sourabhrawatcc/core-utils";

export class WorkspaceInviteCreatedPublisher extends Publisher<{
  payload: WorkspaceInvitePayload;
  subject: Subjects;
}> {
  subject = Subjects.WORKSPACE_INVITE_CREATED;

  constructor(messenger: Messenger) {
    super(messenger.client);
  }
}
