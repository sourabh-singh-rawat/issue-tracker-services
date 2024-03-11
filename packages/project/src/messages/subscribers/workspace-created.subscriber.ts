import {
  Consumers,
  TypeormStore,
  Messenger,
  Streams,
  Subscriber,
  WorkspaceCreatedPayload,
} from "@sourabhrawatcc/core-utils";
import { JsMsg } from "nats";
import { WorkspaceEntity } from "../../app/entities";
import { WorkspaceRepository } from "../../repositories/interfaces/workspace.repository";
import { WorkspaceMemberRepository } from "../../repositories/interfaces/workspace-member.repository";
import { WorkspaceMemberEntity } from "../../app/entities/workspace-member.entity";

export class WorkspaceCreatedSubscriber extends Subscriber<WorkspaceCreatedPayload> {
  readonly stream = Streams.WORKSPACE;
  readonly consumer = Consumers.WorkspaceCreatedConsumerProject;

  constructor(
    private messenger: Messenger,
    private workspaceRepository: WorkspaceRepository,
    private store: TypeormStore,
    private workspaceMemberRepository: WorkspaceMemberRepository,
  ) {
    super(messenger.client);
  }

  onMessage = async (message: JsMsg, payload: WorkspaceCreatedPayload) => {
    const {
      id,
      name,
      ownerId,
      member: { userId, workspaceId },
    } = payload;

    const newWorkspace = new WorkspaceEntity();
    newWorkspace.id = id;
    newWorkspace.name = name;
    newWorkspace.ownerUserId = ownerId;

    const newWorkspaceMember = new WorkspaceMemberEntity();
    newWorkspaceMember.userId = userId;
    newWorkspaceMember.workspaceId = workspaceId;

    const queryRunner = this.store.createQueryRunner();
    await this.store.transaction(queryRunner, async (queryRunner) => {
      await this.workspaceRepository.save(newWorkspace, { queryRunner });
      await this.workspaceMemberRepository.save(newWorkspaceMember, {
        queryRunner,
      });
    });

    message.ack();
    console.log("Message processing completed");
  };
}
