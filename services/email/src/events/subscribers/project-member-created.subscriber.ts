import { JsMsg } from "nats";
import { EmailService } from "../../services/interfaces/email.service";
import {
  CONSUMERS,
  EventBus,
  ProjectMemberPayload,
  Streams,
  SUBJECTS,
  Subscriber,
} from "@issue-tracker/event-bus";

export class ProjectMemberCreatedSubscriber extends Subscriber<ProjectMemberPayload> {
  readonly stream = Streams.PROJECT;
  readonly consumer = CONSUMERS.PROJECT_MEMBER_INVITE_CREATED_MAIL;
  readonly subject = SUBJECTS.PROJECT_MEMBERS_CREATED;

  constructor(
    private eventBus: EventBus,
    private emailService: EmailService,
  ) {
    super(eventBus.client);
  }

  onMessage = async (message: JsMsg, payload: ProjectMemberPayload) => {
    await this.emailService.sendProjectInvitation(payload);
    message.ack();
  };
}
