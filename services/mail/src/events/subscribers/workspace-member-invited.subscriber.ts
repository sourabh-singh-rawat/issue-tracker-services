import { JsMsg } from "nats";
import {
  CONSUMERS,
  NatsBroker,
  Streams,
  SUBJECTS,
  Subscriber,
  WorkspaceInvitePayload,
} from "@issue-tracker/event-bus";
import { WorkspaceEmailService } from "../../services/interfaces/workspace-email.service";

export class WorkspaceMemberInvitedSubscriber extends Subscriber<WorkspaceInvitePayload> {
  readonly stream = Streams.WORKSPACE;
  readonly consumer = CONSUMERS.WORKSPACE_INVITE_CREATED_MAIL;
  readonly subject = SUBJECTS.WORKSPACE_MEMBER_INVITED;

  constructor(
    private broker: NatsBroker,
    private workspaceEmailService: WorkspaceEmailService,
  ) {
    super(broker.client);
  }

  onMessage = async (message: JsMsg, payload: WorkspaceInvitePayload) => {
    await this.workspaceEmailService.sendWorkspaceInvitationEmail(payload);

    message.ack();
  };
}
