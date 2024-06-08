import {
  EventBus,
  Publisher,
  Subjects,
  WorkspaceCreatedPayload,
} from "@issue-tracker/event-bus";

export class WorkspaceCreatedPublisher extends Publisher<{
  payload: WorkspaceCreatedPayload;
  subject: Subjects;
}> {
  subject = Subjects.WORKSPACE_CREATED;

  constructor(eventBus: EventBus) {
    super(eventBus.client);
  }
}
