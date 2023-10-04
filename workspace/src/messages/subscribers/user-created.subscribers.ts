import {
  Consumers,
  Streams,
  Subscriber,
  UserCreatedPayload,
} from "@sourabhrawatcc/core-utils";
import { JsMsg } from "nats";
import { RegisteredServices } from "../../app/service-container";

export class UserCreatedSubscriber extends Subscriber<UserCreatedPayload> {
  readonly stream = Streams.USER;
  readonly consumer = Consumers.UserCreatedConsumerWorkspace;
  private readonly workspaceService;

  constructor(serviceContainer: RegisteredServices) {
    super(serviceContainer.messageService.client);

    this.workspaceService = serviceContainer.workspaceService;
  }

  onMessage = async (message: JsMsg, payload: UserCreatedPayload) => {
    const { userId, defaultWorkspaceId } = payload;

    await this.workspaceService.createDefaultWorkspace(
      userId,
      defaultWorkspaceId,
    );

    message.ack();
    console.log("Message processing completed");
  };
}
