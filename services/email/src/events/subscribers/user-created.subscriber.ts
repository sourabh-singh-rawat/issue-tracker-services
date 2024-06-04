import { JsMsg } from "nats";
import { UserEntity } from "../../data/entities";
import { EmailService } from "../../services/interfaces/email.service";
import {
  Consumers,
  EventBus,
  Streams,
  Subscriber,
  UserCreatedPayload,
} from "@issue-tracker/event-bus";
import { Typeorm } from "@issue-tracker/orm";
import { UserRepository } from "../../data/repositories/interfaces/user.repository";

export class UserCreatedSubscriber extends Subscriber<UserCreatedPayload> {
  readonly stream = Streams.USER;
  readonly consumer = Consumers.UserCreatedConsumerEmail;

  constructor(
    private readonly eventBus: EventBus,
    private readonly userRepository: UserRepository,
    private readonly orm: Typeorm,
    private readonly emailService: EmailService,
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
    await this.emailService.sendVerificationEmail(payload);
    message.ack();
    console.log("Message processing completed");
  };
}
