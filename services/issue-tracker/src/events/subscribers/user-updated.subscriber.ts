import { JsMsg } from "nats";
import { UserService } from "../../services/interfaces/user.service";
import {
  Consumers,
  EventBus,
  Streams,
  Subscriber,
  UserUpdatedPayload,
} from "@issue-tracker/event-bus";

export class UserUpdatedSubscriber extends Subscriber<UserUpdatedPayload> {
  readonly stream = Streams.USER;
  readonly consumer = Consumers.UserUpdatedConsumerProject;

  constructor(
    private eventBus: EventBus,
    private userService: UserService,
  ) {
    super(eventBus.client);
  }

  onMessage = async (message: JsMsg, payload: UserUpdatedPayload) => {
    await this.userService.updateUser(payload);
    message.ack();
    console.log("Message processing completed");
  };
}
