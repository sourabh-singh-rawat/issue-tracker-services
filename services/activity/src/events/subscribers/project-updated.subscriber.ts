import { JsMsg } from "nats";
import { ProjectActivityService } from "../../services/interfaces/project-activity.service";
import {
  Consumers,
  EventBus,
  ProjectPayload,
  Streams,
  Subscriber,
} from "@issue-tracker/event-bus";

export class ProjectUpdatedSubscriber extends Subscriber<ProjectPayload> {
  readonly stream = Streams.PROJECT;
  readonly consumer = Consumers.ProjectUpdatedConsumerActivity;

  constructor(
    private eventBus: EventBus,
    private projectActivityService: ProjectActivityService,
  ) {
    super(eventBus.client);
  }

  onMessage = async (message: JsMsg, payload: ProjectPayload) => {
    const { name, description } = payload;

    if (name) {
      await this.projectActivityService.logUpdatedProjectName(payload);
    }

    if (description) {
      await this.projectActivityService.logUpdatedProjectDescription(payload);
    }
    message.ack();
    console.log("Message processing completed");
  };
}
