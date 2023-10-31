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

export class ProjectCreatedSubscriber extends Subscriber<ProjectPayload> {
  readonly stream = Streams.PROJECT;
  readonly consumer = Consumers.ProjectCreatedConsumerActivity;

  constructor(
    private messageService: MessageService,
    private projectActivityService: ProjectActivityService,
  ) {
    super(messageService.client);
  }

  onMessage = async (message: JsMsg, payload: ProjectPayload) => {
    await this.projectActivityService.logProjectCreated(payload);
    message.ack();
    console.log("Message processing completed");
  };
}
