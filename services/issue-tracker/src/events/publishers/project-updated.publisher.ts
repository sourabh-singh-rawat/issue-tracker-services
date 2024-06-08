import {
  EventBus,
  ProjectPayload,
  Publisher,
  Subjects,
} from "@issue-tracker/event-bus";

export class ProjectUpdatedPublisher extends Publisher<{
  payload: ProjectPayload;
  subject: Subjects;
}> {
  subject = Subjects.PROJECT_UPDATED;

  constructor(eventBus: EventBus) {
    super(eventBus.client);
  }
}
