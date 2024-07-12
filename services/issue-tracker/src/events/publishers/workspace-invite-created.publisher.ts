import {
  EventBus,
  Publisher,
  SUBJECTS,
  Subjects,
  WorkspaceInvitePayload,
} from "@issue-tracker/event-bus";

export class WorkspaceInviteCreatedPublisher extends Publisher<{
  payload: WorkspaceInvitePayload;
  subject: Subjects;
}> {
  subject = SUBJECTS.WORKSPACE_INVITE_CREATED;

  constructor(eventBus: EventBus) {
    super(eventBus.client);
  }
}
