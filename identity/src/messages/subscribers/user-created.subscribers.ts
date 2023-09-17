import {
  Consumers,
  Streams,
  Subscriber,
  UserCreatedPayload,
} from "@sourabhrawatcc/core-utils";
import { Services } from "../../app/container.config";
import { JsMsg } from "nats";
import { UserEntity } from "../../data/entities";

export class UserCreatedSubscriber extends Subscriber<UserCreatedPayload> {
  readonly stream = Streams.USER;
  readonly consumer = Consumers.UserCreatedConsumer;
  private readonly _userRepository;

  constructor(container: Services) {
    super(container.messageServer.natsClient);
    this._userRepository = container.userRepository;
  }

  onMessage = async (
    message: JsMsg,
    payload: UserCreatedPayload,
  ): Promise<void> => {
    console.log(payload);
    console.log(Object.keys(payload));
    const newUser = new UserEntity();
    newUser.id = payload.userId;
    newUser.email = payload.email;

    await this._userRepository.save(newUser);
    message.ack();
    console.log("Message processing completed");
  };
}
