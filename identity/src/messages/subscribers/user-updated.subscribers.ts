import { Consumers, Streams, Subscriber } from "@sourabhrawatcc/core-utils";
import { JsMsg } from "nats";
import { RegisteredServices } from "../../app/service-container";

export class UserUpdatedSubscriber extends Subscriber<string> {
  readonly stream = Streams.USER;
  readonly consumer = Consumers.UserUpdatedConsumerIdentity;
  private readonly userRepository;

  constructor(serviceContainer: RegisteredServices) {
    super(serviceContainer.messageService.client);
    this.userRepository = serviceContainer.userRepository;
  }

  onMessage = async (message: JsMsg, payload: string) => {
    console.log(payload);
    message.ack();
    console.log("Message processing completed");
  };
}
