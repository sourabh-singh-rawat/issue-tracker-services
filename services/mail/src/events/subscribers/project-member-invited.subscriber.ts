import { JsMsg } from "nats";
import {
  CONSUMERS,
  EventBus,
  ProjectMemberPayload,
  Streams,
  SUBJECTS,
  Subscriber,
} from "@issue-tracker/event-bus";
import { ProjectEmailService } from "../../services/interfaces/project-email.service";

export class ProjectMemberInvitedSubscriber extends Subscriber<ProjectMemberPayload> {
  readonly stream = Streams.PROJECT;
  readonly consumer = CONSUMERS.PROJECT_MEMBER_INVITE_CREATED_MAIL;
  readonly subject = SUBJECTS.PROJECT_MEMBERS_INVITED;

  constructor(
    private eventBus: EventBus,
    private readonly projectEmailService: ProjectEmailService,
  ) {
    super(eventBus.client);
  }

  onMessage = async (message: JsMsg, payload: ProjectMemberPayload) => {
    await this.projectEmailService.sendProjectInvitationEmail(payload);

    message.ack();
  };
}
