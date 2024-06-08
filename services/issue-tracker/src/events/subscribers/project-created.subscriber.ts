import { JsMsg } from "nats";
import { ProjectEntity } from "../../data/entities/project.entity";
import { PostgresProjectRepository } from "../../data/repositories/postgres-project.repository";
import {
  Consumers,
  EventBus,
  ProjectPayload,
  Streams,
  Subscriber,
} from "@issue-tracker/event-bus";

export class ProjectCreatedSubscriber extends Subscriber<ProjectPayload> {
  readonly stream = Streams.PROJECT;
  readonly consumer = Consumers.ProjectCreatedConsumerIssue;

  constructor(
    private eventBus: EventBus,
    private projectRepository: PostgresProjectRepository,
  ) {
    super(eventBus.client);
  }

  onMessage = async (message: JsMsg, payload: ProjectPayload) => {
    const { id, name } = payload;

    const newProject = new ProjectEntity();
    newProject.id = id;
    newProject.name = name;

    await this.projectRepository.save(newProject);

    message.ack();
    console.log("Message processing completed");
  };
}
