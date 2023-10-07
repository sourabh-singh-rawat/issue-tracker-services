import {
  Consumers,
  Streams,
  Subscriber,
  UserUpdatedPayload,
} from "@sourabhrawatcc/core-utils";
import { RegisteredServices } from "../../app/service-container";
import { JsMsg } from "nats";

export class UserUpdatedSubscriber extends Subscriber<UserUpdatedPayload> {
  readonly stream = Streams.USER;
  readonly consumer = Consumers.UserUpdatedConsumerWorkspace;
  private readonly userService;

  constructor(serviceContainer: RegisteredServices) {
    super(serviceContainer.messageService.client);

    this.userService = serviceContainer.userService;
  }

  onMessage = async (message: JsMsg, payload: UserUpdatedPayload) => {
    const { userId, defaultWorkspaceId, version } = payload;
    await this.userService.updateUser(userId, defaultWorkspaceId, version);
    message.ack();
    console.log("Message processing completed");
  };
}
