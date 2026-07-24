import {
  type IBroker,
  CONSUMERS,
  Streams,
  SUBJECTS,
  Subscriber,
  WorkspaceMemberInvitedData,
} from "@pine/events";
import { inject, injectable } from "inversify";
import { JsMsg } from "nats";
import { TYPES } from "@/bootstrap/container-types";
import { IWorkspaceEmailService } from "../services/IWorkspaceEmailService";

@injectable()
export class WorkspaceMemberInvitedSubscriber extends Subscriber<WorkspaceMemberInvitedData> {
  readonly stream = Streams.WORKSPACE;
  readonly consumer = CONSUMERS.WORKSPACE_INVITE_CREATED_MAIL;
  readonly subject = SUBJECTS.WORKSPACE_MEMBER_INVITED;

  constructor(
    @inject(TYPES.Broker)
    private readonly broker: IBroker,
    @inject(TYPES.WorkspaceEmailService)
    private readonly workspaceEmailService: IWorkspaceEmailService,
  ) {
    super(broker.client);
  }

  onMessage = async (message: JsMsg, payload: WorkspaceMemberInvitedData) => {
    await this.workspaceEmailService.sendWorkspaceInvitationEmail(payload);

    message.ack();
  };
}
