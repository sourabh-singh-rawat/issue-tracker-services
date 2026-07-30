import {
  type CloudEvent,
  type IBroker,
  type WorkspaceMemberInvitedData,
  Streams,
  Consumer,
  WorkspaceMemberInvitedEvent,
  validateEvent,
} from "@pine/events";
import { inject, injectable } from "inversify";
import { JsMsg } from "nats";
import { TYPES } from "@/bootstrap/container-types";
import { IWorkspaceEmailService } from "../services/IWorkspaceEmailService";

@injectable()
export class WorkspaceInviteConsumer extends Consumer<CloudEvent<WorkspaceMemberInvitedData>> {
  readonly stream = Streams.ISSUES;
  readonly consumer = "notification-workspace-invite";
  readonly subjects = [WorkspaceMemberInvitedEvent.type];

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
