import { JsMsg } from "nats";
import {
  CONSUMERS,
  EventBus,
  Streams,
  Subjects,
  Subscriber,
  UserUpdatedPayload,
} from "@issue-tracker/event-bus";
import { UserService } from "../../services/interfaces/user.service";

export class UserUpdatedSubscriber extends Subscriber<UserUpdatedPayload> {
  readonly stream = Streams.USER;
  readonly consumer = CONSUMERS.USER_UPDATED_CONSUMER_ISSUE_TRACKER;
  readonly subject = Subjects.USER_UPDATED;

  constructor(
    private readonly eventBus: EventBus,
    private readonly userService: UserService,
  ) {
    super(eventBus.client);
  }

  onMessage = async (message: JsMsg, payload: UserUpdatedPayload) => {
    await this.userService.updateUser(payload);
    message.ack();
  };
}
