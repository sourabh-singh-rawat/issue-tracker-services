import {
  Consumers,
  MessageService,
  Streams,
  Subscriber,
  WorkspaceCreatedPayload,
} from "@sourabhrawatcc/core-utils";
import { JsMsg } from "nats";
import { WorkspaceEntity } from "../../data/entities";
import { WorkspaceRepository } from "../../data/repositories/interfaces/workspace.repository";

export class WorkspaceCreatedSubscriber extends Subscriber<WorkspaceCreatedPayload> {
  readonly stream = Streams.WORKSPACE;
  readonly consumer = Consumers.WorkspaceCreatedConsumerProject;

  constructor(
    private messageService: MessageService,
    private workspaceRepository: WorkspaceRepository,
  ) {
    super(messageService.client);
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
