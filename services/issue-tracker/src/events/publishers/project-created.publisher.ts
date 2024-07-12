import {
  EventBus,
  ProjectPayload,
  Publisher,
  SUBJECTS,
  Subjects,
} from "@issue-tracker/event-bus";

export class ProjectCreatedPublisher extends Publisher<{
  payload: ProjectPayload;
  subject: Subjects;
}> {
  subject = SUBJECTS.PROJECT_CREATED;

  constructor(eventBus: EventBus) {
    super(eventBus.client);
  }
}
