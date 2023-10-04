import {
  Consumers,
  Streams,
  Subscriber,
  UserCreatedPayload,
} from "@sourabhrawatcc/core-utils";
import { JsMsg } from "nats";
import { UserEntity } from "../../data/entities";
import { RegisteredServices } from "../../app/service-container";

export class UserCreatedSubscriber extends Subscriber<UserCreatedPayload> {
  readonly stream = Streams.USER;
  readonly consumer = Consumers.UserCreatedConsumerIdentity;
  private readonly userRepository;

  constructor(serviceContainer: RegisteredServices) {
    super(serviceContainer.messageService.client);
    this.userRepository = serviceContainer.userRepository;
  }

  onMessage = async (message: JsMsg, payload: UserCreatedPayload) => {
    const newUser = new UserEntity();
    newUser.id = payload.userId;
    newUser.email = payload.email;
    newUser.defaultWorkspaceId = payload.defaultWorkspaceId;

    await this.userRepository.save(newUser);
    message.ack();
    console.log("Message processing completed");
  };
}
