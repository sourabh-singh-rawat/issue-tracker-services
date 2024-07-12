import {
  EventBus,
  Publisher,
  SUBJECTS,
  Subjects,
  WorkspaceCreatedPayload,
} from "@issue-tracker/event-bus";

export class WorkspaceCreatedPublisher extends Publisher<{
  payload: WorkspaceCreatedPayload;
  subject: Subjects;
}> {
  subject = SUBJECTS.WORKSPACE_CREATED;

  constructor(eventBus: EventBus) {
    super(eventBus.client);
  }
}
