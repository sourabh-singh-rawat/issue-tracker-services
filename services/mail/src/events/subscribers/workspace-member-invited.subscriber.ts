import { JsMsg } from "nats";
import {
  CONSUMERS,
  EventBus,
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
    private eventBus: EventBus,
    private workspaceEmailService: WorkspaceEmailService,
  ) {
    super(eventBus.client);
  }

  onMessage = async (message: JsMsg, payload: WorkspaceInvitePayload) => {
    await this.workspaceEmailService.sendWorkspaceInvitationEmail(payload);

    message.ack();
  };
}
