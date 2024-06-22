import { JsMsg } from "nats";
import { EmailService } from "../../services/interfaces/email.service";
import {
  Consumers,
  EventBus,
  Streams,
  Subjects,
  Subscriber,
  WorkspaceInvitePayload,
} from "@issue-tracker/event-bus";

export class WorkspaceInviteCreatedSubscriber extends Subscriber<WorkspaceInvitePayload> {
  readonly stream = Streams.WORKSPACE;
  readonly consumer = Consumers.WorkspaceInviteCreatedConsumerEmail;
  readonly subject = Subjects.WORKSPACE_INVITE_CREATED;

  constructor(
    private eventBus: EventBus,
    private emailService: EmailService,
  ) {
    super(eventBus.client);
  }

  onMessage = async (message: JsMsg, payload: WorkspaceInvitePayload) => {
    await this.emailService.sendWorkspaceInvitation(payload);

    message.ack();
  };
}
