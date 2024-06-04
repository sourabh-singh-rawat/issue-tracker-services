import { JsMsg } from "nats";
import { UserEntity } from "../../data/entities";
import {
  Consumers,
  EventBus,
  Streams,
  Subscriber,
  UserCreatedPayload,
} from "@issue-tracker/event-bus";
import { UserRepository } from "../../data/repositories/interfaces/user.repository";

export class UserCreatedSubscriber extends Subscriber<UserCreatedPayload> {
  readonly stream = Streams.USER;
  readonly consumer = Consumers.UserCreatedConsumerActivity;

  constructor(
    private eventBus: EventBus,
    private userRepository: UserRepository,
  ) {
    super(eventBus.client);
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
