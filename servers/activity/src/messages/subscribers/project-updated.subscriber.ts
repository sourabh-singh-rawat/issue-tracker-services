import {
  Consumers,
  MessageService,
  ProjectActivity,
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
    private messageService: MessageService,
    private projectActivityService: ProjectActivityService,
  ) {
    super(messageService.client);
  }

  onMessage = async (message: JsMsg, payload: ProjectPayload) => {
    const { name } = payload;

    if (name) {
      await this.projectActivityService.logProjectNameUpdated(payload);
    }
    message.ack();
    console.log("Message processing completed");
  };
}
