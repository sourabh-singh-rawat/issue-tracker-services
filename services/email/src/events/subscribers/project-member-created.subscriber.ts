import { JsMsg } from "nats";
import { EmailService } from "../../services/interfaces/email.service";
import {
  Consumers,
  EventBus,
  ProjectMemberPayload,
  Streams,
  Subscriber,
} from "@issue-tracker/event-bus";

export class ProjectMemberCreatedSubscriber extends Subscriber<ProjectMemberPayload> {
  readonly stream = Streams.PROJECT;
  readonly consumer = Consumers.ProjectMemberCreatedConsumerEmail;

  constructor(
    private eventBus: EventBus,
    private emailService: EmailService,
  ) {
    super(eventBus.client);
  }

  onMessage = async (message: JsMsg, payload: ProjectMemberPayload) => {
    await this.emailService.sendProjectInvitation(payload);
    message.ack();
    console.log("Message processing completed");
  };
}
