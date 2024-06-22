import { JsMsg } from "nats";
import { UserEntity } from "../../data/entities";
import {
  Consumers,
  EventBus,
  Streams,
  Subjects,
  Subscriber,
  UserCreatedPayload,
} from "@issue-tracker/event-bus";
import { UserRepository } from "../../data/repositories/interfaces/user.repository";

export class UserCreatedSubscriber extends Subscriber<UserCreatedPayload> {
  readonly stream = Streams.USER;
  readonly consumer = Consumers.UserCreatedConsumerIdentity;
  readonly subject = Subjects.USER_CREATED;

  constructor(
    private readonly eventBus: EventBus,
    private readonly userRepository: UserRepository,
  ) {
    super(eventBus.client);
  }

  onMessage = async (message: JsMsg, payload: UserCreatedPayload) => {
    const {
      userId,
      email,
      isEmailVerified,
      defaultWorkspaceId,
      // displayName,
      // photoUrl,
    } = payload;

    const newUser = new UserEntity();
    newUser.id = userId;
    newUser.email = email;
    newUser.defaultWorkspaceId = defaultWorkspaceId;
    newUser.isEmailVerified = isEmailVerified;
    // newUser.displayName = displayName;
    // newUser.photoUrl = photoUrl;

    await this.userRepository.save(newUser);
    message.ack();
  };
}
