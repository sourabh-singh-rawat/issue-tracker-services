import {
  Consumers,
  MessageService,
  Streams,
  Subscriber,
  UserUpdatedPayload,
} from "@sourabhrawatcc/core-utils";
import { JsMsg } from "nats";
import { UserService } from "../../services/interfaces/user.service";

export class UserUpdatedSubscriber extends Subscriber<UserUpdatedPayload> {
  readonly stream = Streams.USER;
  readonly consumer = Consumers.UserUpdatedConsumerIdentity;

  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UserService,
  ) {
    super(messageService.client);
  }

  onMessage = async (message: JsMsg, payload: UserUpdatedPayload) => {
    const { userId, defaultWorkspaceId, version } = payload;
    await this.userService.updateUser(userId, defaultWorkspaceId, version);
    message.ack();
    console.log("Message processing completed");
  };
}
