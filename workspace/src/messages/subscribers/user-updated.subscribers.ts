import { Consumers, Streams, Subscriber } from "@sourabhrawatcc/core-utils";
import { RegisteredServices } from "../../app/service-container";
import { JsMsg } from "nats";

export class UserUpdatedSubscriber extends Subscriber<string> {
  readonly stream = Streams.USER;
  readonly consumer = Consumers.UserUpdatedConsumerWorkspace;
  // private readonly _userRepository;

  constructor(serviceContainer: RegisteredServices) {
    super(serviceContainer.messageService.client);
    // this._userRepository = container.userRepository;
  }

  onMessage = async (message: JsMsg, payload: string): Promise<void> => {
    console.log(payload);
    message.ack();
    console.log("Message processing completed");
  };
}
