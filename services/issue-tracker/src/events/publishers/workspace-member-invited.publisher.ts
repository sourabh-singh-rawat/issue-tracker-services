import {
  EventBus,
  Publisher,
  SUBJECTS,
  Subjects,
  WorkspaceInvitePayload,
} from "@issue-tracker/event-bus";

export class WorkspaceMemberInvitedPublisher extends Publisher<{
  payload: WorkspaceInvitePayload;
  subject: Subjects;
}> {
  subject = SUBJECTS.WORKSPACE_MEMBER_INVITED;

  constructor(eventBus: EventBus) {
    super(eventBus.client);
  }
}
