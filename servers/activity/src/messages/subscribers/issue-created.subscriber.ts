import {
  Consumers,
  IssueCreatedPayload,
  NatsMessenger,
  Streams,
  Subscriber,
} from "@sourabhrawatcc/core-utils";
import { JsMsg } from "nats";
import { IssueActivityService } from "../../services/interfaces/issue-activity.service";

export class IssueCreatedSubscriber extends Subscriber<IssueCreatedPayload> {
  readonly stream = Streams.ISSUE;
  readonly consumer = Consumers.IssueCreatedConsumerActivity;

  constructor(
    private messenger: NatsMessenger,
    private issueActivityService: IssueActivityService,
  ) {
    super(messenger.client);
  }

  onMessage = async (message: JsMsg, payload: IssueCreatedPayload) => {
    await this.issueActivityService.logIssueCreated(payload);
    message.ack();
    console.log("Message processing completed");
  };
}
