import { JsMsg } from "nats";
import { ProjectActivityService } from "../../services/interfaces/project-activity.service";
import {
  Consumers,
  EventBus,
  ProjectPayload,
  Streams,
  Subscriber,
} from "@issue-tracker/event-bus";

export class ProjectCreatedSubscriber extends Subscriber<ProjectPayload> {
  readonly stream = Streams.PROJECT;
  readonly consumer = Consumers.ProjectCreatedConsumerActivity;

  constructor(
    private eventBus: EventBus,
    private projectActivityService: ProjectActivityService,
  ) {
    super(eventBus.client);
  }

  onMessage = async (message: JsMsg, payload: ProjectPayload) => {
    await this.projectActivityService.logCreatedProject(payload);
    message.ack();
    console.log("Message processing completed");
  };
}
