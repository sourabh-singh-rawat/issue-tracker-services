import {
  Consumers,
  Messenger,
  ProjectPayload,
  Streams,
  Subscriber,
} from "@sourabhrawatcc/core-utils";
import { JsMsg } from "nats";
import { ProjectEntity } from "../../data/entities/project.entity";
import { PostgresProjectRepository } from "../../data/repositories/postgres-project.repository";
import { CasbinProjectGuardian } from "../../app/guardians/casbin/casbin-project.guardian";

export class ProjectCreatedSubscriber extends Subscriber<ProjectPayload> {
  readonly stream = Streams.PROJECT;
  readonly consumer = Consumers.ProjectCreatedConsumerIssue;

  constructor(
    private messenger: Messenger,
    private projectRepository: PostgresProjectRepository,
    private projectGuardian: CasbinProjectGuardian,
  ) {
    super(messenger.client);
  }

  onMessage = async (message: JsMsg, payload: ProjectPayload) => {
    const { id, name, ownerUserId } = payload;

    const newProject = new ProjectEntity();
    newProject.id = id;
    newProject.name = name;

    await this.projectGuardian.createOwner(ownerUserId, id);
    await this.projectRepository.save(newProject);

    message.ack();
    console.log("Message processing completed");
  };
}
