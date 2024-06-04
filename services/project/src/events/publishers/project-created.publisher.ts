import {
  EventBus,
  ProjectPayload,
  Publisher,
  Subjects,
} from "@issue-tracker/event-bus";

export class ProjectCreatedPublisher extends Publisher<{
  payload: ProjectPayload;
  subject: Subjects;
}> {
  subject = Subjects.PROJECT_CREATED;

  constructor(eventBus: EventBus) {
    super(eventBus.client);
  }
}
