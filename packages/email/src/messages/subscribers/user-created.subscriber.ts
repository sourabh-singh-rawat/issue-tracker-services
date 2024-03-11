import {
  Consumers,
  TypeormStore,
  Messenger,
  Streams,
  Subscriber,
  UserCreatedPayload,
} from "@sourabhrawatcc/core-utils";
import { JsMsg } from "nats";
import { UserEntity } from "../../app/entities";
import { UserRepository } from "../../repositories/interfaces/user.repository";
import { EmailService } from "../../services/interfaces/email.service";

export class UserCreatedSubscriber extends Subscriber<UserCreatedPayload> {
  readonly stream = Streams.USER;
  readonly consumer = Consumers.UserCreatedConsumerEmail;

  constructor(
    private readonly messenger: Messenger,
    private readonly userRepository: UserRepository,
    private readonly store: TypeormStore,
    private readonly emailService: EmailService,
  ) {
    super(messenger.client);
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
    await this.emailService.sendVerificationEmail(payload);
    message.ack();
    console.log("Message processing completed");
  };
}
