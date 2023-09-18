import { Consumers, Streams, Subscriber } from "@sourabhrawatcc/core-utils";
import { Services } from "../../app/container.config";
import { JsMsg } from "nats";

export class UserUpdatedSubscriber extends Subscriber<string> {
  readonly stream = Streams.USER;
  readonly consumer = Consumers.UserUpdatedConsumer;
  private readonly _userRepository;

  constructor(container: Services) {
    super(container.messageServer.natsClient);
    this._userRepository = container.userRepository;
  }

  onMessage = async (message: JsMsg, payload: string): Promise<void> => {
    console.log(payload);
    message.ack();
    console.log("Message processing completed");
  };
}
