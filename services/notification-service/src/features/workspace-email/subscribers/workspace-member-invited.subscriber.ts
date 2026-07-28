import {
  type CloudEvent,
  type IBroker,
  type WorkspaceMemberInvitedData,
  CONSUMERS,
  Streams,
  Subscriber,
  WorkspaceMemberInvitedEvent,
  validateEvent,
} from "@pine/events";
import { inject, injectable } from "inversify";
import { JsMsg } from "nats";
import { TYPES } from "@/bootstrap/container-types";
import { IWorkspaceEmailService } from "../services/IWorkspaceEmailService";

@injectable()
export class WorkspaceMemberInvitedSubscriber extends Subscriber<
  CloudEvent<WorkspaceMemberInvitedData>
> {
  readonly stream = Streams.ISSUES;
  readonly consumer = CONSUMERS.WORKSPACE_INVITE_CREATED_NOTIFICATION;
  readonly subject = WorkspaceMemberInvitedEvent.type;

  constructor(
    @inject(TYPES.Broker)
    private readonly broker: IBroker,
    @inject(TYPES.WorkspaceEmailService)
    private readonly workspaceEmailService: IWorkspaceEmailService,
  ) {
    super(broker.client);
  }

  onMessage = async (message: JsMsg, payload: CloudEvent<WorkspaceMemberInvitedData>) => {
    const event = validateEvent(WorkspaceMemberInvitedEvent, payload);
    await this.workspaceEmailService.sendWorkspaceInvitationEmail(event.data!);

    message.ack();
  };
}
