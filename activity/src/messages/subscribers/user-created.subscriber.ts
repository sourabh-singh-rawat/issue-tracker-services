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
  readonly consumer = Consumers.UserCreatedConsumerActivity;

  constructor(
    private messageService: MessageService,
    private userRepository: UserRepository,
  ) {
    super(messageService.client);
  }

  onMessage = async (message: JsMsg, payload: UserCreatedPayload) => {
    const {
      userId,
      email,
      isEmailVerified,
      defaultWorkspaceId,
      displayName,
      photoUrl,
    } = payload;

    const newUser = new UserEntity();
    newUser.id = userId;
    newUser.email = email;
    newUser.defaultWorkspaceId = defaultWorkspaceId;
    newUser.isEmailVerified = isEmailVerified;
    newUser.displayName = displayName;
    newUser.photoUrl = photoUrl;

    await this.userRepository.save(newUser);
    message.ack();
    console.log("Message processing completed");
  };
}