import {
  Consumers,
  MessageService,
  Streams,
  Subscriber,
  UserCreatedPayload,
} from "@sourabhrawatcc/core-utils";
import { JsMsg } from "nats";
import { UserEntity } from "../../data/entities";
import { UserRepository } from "../../data/repositories/interfaces/user.repository";

export class UserCreatedSubscriber extends Subscriber<UserCreatedPayload> {
  readonly stream = Streams.USER;
  readonly consumer = Consumers.UserCreatedConsumerProject;

  constructor(
    private messageService: MessageService,
    private userRepository: UserRepository,
  ) {
    super(messageService.client);
  }

  onMessage = async (message: JsMsg, payload: UserCreatedPayload) => {
    const { userId, isEmailVerified, defaultWorkspaceId } = payload;

    const newUser = new UserEntity();
    newUser.id = userId;
    newUser.defaultWorkspaceId = defaultWorkspaceId;
    newUser.isEmailVerified = isEmailVerified;

    await this.userRepository.save(newUser);
    message.ack();
    console.log("Message processing completed");
  };
}
