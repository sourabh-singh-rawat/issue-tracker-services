import {
  Consumers,
  Streams,
  Subscriber,
  UserCreatedPayload,
} from "@sourabhrawatcc/core-utils";
import { JsMsg } from "nats";
import { RegisteredServices } from "../../app/service-container";
import { UserEntity } from "../../data/entities";

export class UserCreatedSubscriber extends Subscriber<UserCreatedPayload> {
  readonly stream = Streams.USER;
  readonly consumer = Consumers.UserCreatedConsumerProject;
  private readonly userRepository;

  constructor(serviceContainer: RegisteredServices) {
    super(serviceContainer.messageService.client);
    this.userRepository = serviceContainer.userRepository;
  }

  onMessage = async (message: JsMsg, payload: UserCreatedPayload) => {
    const { userId, email, defaultWorkspaceId } = payload;

    const newUser = new UserEntity();
    newUser.id = userId;
    newUser.email = email;
    newUser.defaultWorkspaceId = defaultWorkspaceId;

    await this.userRepository.save(newUser);
    message.ack();
    console.log("Message processing completed");
  };
}
