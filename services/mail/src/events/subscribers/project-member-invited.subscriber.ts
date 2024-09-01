import { JsMsg } from "nats";
import {
  CONSUMERS,
  NatsBroker,
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
    private broker: NatsBroker,
    private readonly projectEmailService: ProjectEmailService,
  ) {
    super(broker.client);
  }

  onMessage = async (message: JsMsg, payload: ProjectMemberPayload) => {
    await this.projectEmailService.sendProjectInvitationEmail(payload);

    message.ack();
  };
}
