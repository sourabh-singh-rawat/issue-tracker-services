import { JsMsg } from "nats";
import { EmailService } from "../../services/interfaces/email.service";
import {
  Consumers,
  EventBus,
  Streams,
  Subscriber,
  WorkspaceInvitePayload,
} from "@issue-tracker/event-bus";

export class WorkspaceInviteCreatedSubscriber extends Subscriber<WorkspaceInvitePayload> {
  readonly stream = Streams.WORKSPACE;
  readonly consumer = Consumers.WorkspaceInviteCreatedConsumerEmail;

  constructor(
    private eventBus: EventBus,
    private emailService: EmailService,
  ) {
    super(eventBus.client);
  }

  onMessage = async (message: JsMsg, payload: WorkspaceInvitePayload) => {
    await this.emailService.sendWorkspaceInvitation(payload);

    message.ack();
    console.log("Message processing completed");
  };
}
