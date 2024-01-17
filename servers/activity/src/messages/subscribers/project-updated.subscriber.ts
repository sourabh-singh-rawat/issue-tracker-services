import {
  Consumers,
  NatsMessenger,
  ProjectPayload,
  Streams,
  Subscriber,
} from "@sourabhrawatcc/core-utils";
import { JsMsg } from "nats";
import { ProjectActivityService } from "../../services/interfaces/project-activity.service";

export class ProjectUpdatedSubscriber extends Subscriber<ProjectPayload> {
  readonly stream = Streams.PROJECT;
  readonly consumer = Consumers.ProjectUpdatedConsumerActivity;

  constructor(
    private messenger: NatsMessenger,
    private projectActivityService: ProjectActivityService,
  ) {
    super(messenger.client);
  }

  onMessage = async (message: JsMsg, payload: ProjectPayload) => {
    const { name, description, status, startDate, endDate } = payload;

    if (name) {
      await this.projectActivityService.logProjectNameUpdated(payload);
    }

    if (description) {
      await this.projectActivityService.logProjectDescriptionUpdated(payload);
    }
    message.ack();
    console.log("Message processing completed");
  };
}
