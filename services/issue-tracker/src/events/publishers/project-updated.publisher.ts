import {
  EventBus,
  ProjectPayload,
  Publisher,
  SUBJECTS,
  Subjects,
} from "@issue-tracker/event-bus";

export class ProjectUpdatedPublisher extends Publisher<{
  payload: ProjectPayload;
  subject: Subjects;
}> {
  subject = SUBJECTS.PROJECT_UPDATED;

  constructor(eventBus: EventBus) {
    super(eventBus.client);
  }
}
