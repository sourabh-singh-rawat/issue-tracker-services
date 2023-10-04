import {
  Consumers,
  Streams,
  Subscriber,
  WorkspaceCreatedPayload,
} from "@sourabhrawatcc/core-utils";
import { JsMsg } from "nats";
import { RegisteredServices } from "../../app/service-container";
import { WorkspaceEntity } from "../../data/entities";

export class WorkspaceCreatedSubscriber extends Subscriber<WorkspaceCreatedPayload> {
  readonly stream = Streams.WORKSPACE;
  readonly consumer = Consumers.WorkspaceCreatedConsumerProject;
  private readonly workspaceRepository;

  constructor(serviceContainer: RegisteredServices) {
    super(serviceContainer.messageService.client);
    this.workspaceRepository = serviceContainer.workspaceRepository;
  }

  onMessage = async (message: JsMsg, payload: WorkspaceCreatedPayload) => {
    const { id, name, ownerId } = payload;

    const newWorkspace = new WorkspaceEntity();
    newWorkspace.id = id;
    newWorkspace.name = name;
    newWorkspace.ownerUserId = ownerId;

    await this.workspaceRepository.save(newWorkspace);
    message.ack();
    console.log("Message processing completed");
  };
}
