import { JsMsg } from "nats";
import { UserService } from "../../services/interfaces/user.service";
import {
  CONSUMERS,
  EventBus,
  Streams,
  Subjects,
  Subscriber,
  UserUpdatedPayload,
} from "@issue-tracker/event-bus";

export class UserUpdatedSubscriber extends Subscriber<UserUpdatedPayload> {
  readonly stream = Streams.USER;
  readonly consumer = CONSUMERS.USER_UPDATED_ISSUE_TRACKER;
  readonly subject = Subjects.USER_UPDATED;

  constructor(private eventBus: EventBus, private userService: UserService) {
    super(eventBus.client);
  }

  onMessage = async (message: JsMsg, payload: UserUpdatedPayload) => {
    await this.userService.updateUser(payload);
    message.ack();
  };
}
