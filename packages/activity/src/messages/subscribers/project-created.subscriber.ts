import {
  Consumers,
  NatsMessenger,
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
    private messenger: NatsMessenger,
    private projectActivityService: ProjectActivityService,
  ) {
    super(messenger.client);
  }

  onMessage = async (message: JsMsg, payload: ProjectPayload) => {
    await this.projectActivityService.logCreatedProject(payload);
    message.ack();
    console.log("Message processing completed");
  };
}
