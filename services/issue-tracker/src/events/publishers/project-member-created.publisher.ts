import {
  EventBus,
  ProjectMemberPayload,
  Publisher,
  SUBJECTS,
  Subjects,
} from "@issue-tracker/event-bus";

export class ProjectMemberCreatedPublisher extends Publisher<{
  payload: ProjectMemberPayload;
  subject: Subjects;
}> {
  subject = SUBJECTS.PROJECT_MEMBERS_CREATED;

  constructor(eventBus: EventBus) {
    super(eventBus.client);
  }
}
