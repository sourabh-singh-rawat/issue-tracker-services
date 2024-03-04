import {
  Consumers,
  Messenger,
  Streams,
  Subscriber,
  WorkspaceInvitePayload,
} from "@sourabhrawatcc/core-utils";
import { JsMsg } from "nats";
import { EmailService } from "../../services/interfaces/email.service";

export class WorkspaceInviteCreatedSubscriber extends Subscriber<WorkspaceInvitePayload> {
  readonly stream = Streams.WORKSPACE;
  readonly consumer = Consumers.WorkspaceInviteCreatedConsumerEmail;

  constructor(
    private messenger: Messenger,
    private emailService: EmailService,
  ) {
    super(messenger.client);
  }

  onMessage = async (message: JsMsg, payload: WorkspaceInvitePayload) => {
    await this.emailService.sendWorkspaceInvitation(payload);

    message.ack();
    console.log("Message processing completed");
  };
}
