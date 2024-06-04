import {
  EventBus,
  ProjectMemberPayload,
  Publisher,
  Subjects,
} from "@issue-tracker/event-bus";

export class ProjectMemberCreatedPublisher extends Publisher<{
  payload: ProjectMemberPayload;
  subject: Subjects;
}> {
  subject = Subjects.PROJECT_MEMBERS_CREATED;

  constructor(eventBus: EventBus) {
    super(eventBus.client);
  }
}
