import {
  Consumers,
  Messenger,
  Streams,
  Subscriber,
  ProjectMemberPayload,
} from "@sourabhrawatcc/core-utils";
import { JsMsg } from "nats";
import { EmailService } from "../../services/interfaces/email.service";

export class ProjectMemberCreatedSubscriber extends Subscriber<ProjectMemberPayload> {
  readonly stream = Streams.PROJECT;
  readonly consumer = Consumers.ProjectMemberCreatedConsumerEmail;

  constructor(
    private messenger: Messenger,
    private emailService: EmailService,
  ) {
    super(messenger.client);
  }

  onMessage = async (message: JsMsg, payload: ProjectMemberPayload) => {
    await this.emailService.sendProjectInvitation(payload);
    message.ack();
    console.log("Message processing completed");
  };
}
