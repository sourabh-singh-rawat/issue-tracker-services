import {
  Consumers,
  DatabaseService,
  MessageService,
  Streams,
  Subscriber,
  WorkspaceCreatedPayload,
} from "@sourabhrawatcc/core-utils";
import { JsMsg } from "nats";
import { WorkspaceEntity } from "../../data/entities";
import { WorkspaceRepository } from "../../data/repositories/interfaces/workspace.repository";
import { WorkspaceMemberRepository } from "../../data/repositories/interfaces/workspace-member.repository";
import { WorkspaceMemberEntity } from "../../data/entities/workspace-member.entity";

export class WorkspaceCreatedSubscriber extends Subscriber<WorkspaceCreatedPayload> {
  readonly stream = Streams.WORKSPACE;
  readonly consumer = Consumers.WorkspaceCreatedConsumerProject;

  constructor(
    private messageService: MessageService,
    private workspaceRepository: WorkspaceRepository,
    private databaseService: DatabaseService,
    private workspaceMemberRepository: WorkspaceMemberRepository,
  ) {
    super(messageService.client);
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

    const queryRunner = this.databaseService.createQueryRunner();
    await this.databaseService.transaction(queryRunner, async (queryRunner) => {
      await this.workspaceRepository.save(newWorkspace, { queryRunner });
      await this.workspaceMemberRepository.save(newWorkspaceMember, {
        queryRunner,
      });
    });

    message.ack();
    console.log("Message processing completed");
  };
}
