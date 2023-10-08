import {
  Consumers,
  MessageService,
  Streams,
  Subscriber,
  UserCreatedPayload,
} from "@sourabhrawatcc/core-utils";
import { JsMsg } from "nats";
import { WorkspaceService } from "../../services/interfaces/workspace.service";

export class UserCreatedSubscriber extends Subscriber<UserCreatedPayload> {
  readonly stream = Streams.USER;
  readonly consumer = Consumers.UserCreatedConsumerWorkspace;

  constructor(
    private messageService: MessageService,
    private workspaceService: WorkspaceService,
  ) {
    super(messageService.client);
  }

  onMessage = async (message: JsMsg, payload: UserCreatedPayload) => {
    const { userId, defaultWorkspaceId, isEmailVerified } = payload;

    await this.workspaceService.createDefaultWorkspace(
      userId,
      isEmailVerified,
      defaultWorkspaceId,
    );

    message.ack();
    console.log("Message processing completed");
  };
}
