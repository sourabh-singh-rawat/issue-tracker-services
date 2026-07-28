import {
  type CloudEvent,
  type IBroker,
  type ProjectMemberData,
  CONSUMERS,
  ProjectMemberInvitedEvent,
  Streams,
  Subscriber,
  validateEvent,
} from "@pine/events";
import { inject, injectable } from "inversify";
import { JsMsg } from "nats";
import { TYPES } from "@/bootstrap/container-types";
import { IProjectEmailService } from "../services/IProjectEmailService";

@injectable()
export class ProjectMemberInvitedSubscriber extends Subscriber<CloudEvent<ProjectMemberData>> {
  readonly stream = Streams.ISSUES;
  readonly consumer = CONSUMERS.PROJECT_MEMBER_INVITE_CREATED_NOTIFICATION;
  readonly subject = ProjectMemberInvitedEvent.type;

  constructor(
    @inject(TYPES.Broker)
    private readonly broker: IBroker,
    @inject(TYPES.ProjectEmailService)
    private readonly projectEmailService: IProjectEmailService,
  ) {
    super(broker.client);
  }

  onMessage = async (message: JsMsg, payload: CloudEvent<ProjectMemberData>) => {
    const event = validateEvent(ProjectMemberInvitedEvent, payload);
    await this.projectEmailService.sendProjectInvitationEmail(event.data!);

    message.ack();
  };
}
