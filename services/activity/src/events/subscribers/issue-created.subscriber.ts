import { JsMsg } from "nats";
import { IssueActivityService } from "../../services/interfaces/issue-activity.service";
import {
  Consumers,
  EventBus,
  IssueCreatedPayload,
  Streams,
  Subscriber,
} from "@issue-tracker/event-bus";

export class IssueCreatedSubscriber extends Subscriber<IssueCreatedPayload> {
  readonly stream = Streams.ISSUE;
  readonly consumer = Consumers.IssueCreatedConsumerActivity;

  constructor(
    private eventBus: EventBus,
    private issueActivityService: IssueActivityService,
  ) {
    super(eventBus.client);
  }

  onMessage = async (message: JsMsg, payload: IssueCreatedPayload) => {
    await this.issueActivityService.logCreatedIssue(payload);
    message.ack();
    console.log("Message processing completed");
  };
}
