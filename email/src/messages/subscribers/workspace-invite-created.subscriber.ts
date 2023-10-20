import {
  Consumers,
  MessageService,
  Streams,
  Subscriber,
  WorkspaceInvitePayload,
} from "@sourabhrawatcc/core-utils";
import { JsMsg } from "nats";

export class WorkspaceInviteCreatedSubscriber extends Subscriber<WorkspaceInvitePayload> {
  readonly stream = Streams.WORKSPACE;
  readonly consumer = Consumers.WorkspaceInviteCreatedConsumerEmail;

  constructor(private messageService: MessageService) {
    super(messageService.client);
  }

  onMessage = async (message: JsMsg, payload: WorkspaceInvitePayload) => {
    console.log(payload);
    message.ack();
    console.log("Message processing completed");
  };
}
