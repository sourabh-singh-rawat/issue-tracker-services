import {
  Broker,
  CONSUMERS,
  ProjectMemberPayload,
  Streams,
  SUBJECTS,
  Subscriber,
} from "@pine/event-bus";
import { inject, injectable } from "inversify";
import { JsMsg } from "nats";
import { TYPES } from "@/bootstrap/container-types";
import { IProjectEmailService } from "../services/IProjectEmailService";

@injectable()
export class ProjectMemberInvitedSubscriber extends Subscriber<ProjectMemberPayload> {
  readonly stream = Streams.PROJECT;
  readonly consumer = CONSUMERS.PROJECT_MEMBER_INVITE_CREATED_MAIL;
  readonly subject = SUBJECTS.PROJECT_MEMBERS_INVITED;

  constructor(
    @inject(TYPES.Broker)
    private readonly broker: Broker,
    @inject(TYPES.ProjectEmailService)
    private readonly projectEmailService: IProjectEmailService,
  ) {
    super(broker.client);
  }

  onMessage = async (message: JsMsg, payload: ProjectMemberPayload) => {
    await this.projectEmailService.sendProjectInvitationEmail(payload);

    message.ack();
  };
}
