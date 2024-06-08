import { JsMsg } from "nats";
import { WorkspaceEntity } from "../../data/entities/workspace.entity";
import { WorkspaceRepository } from "../../data/repositories/interfaces/workspace.repository";
import { WorkspaceMemberRepository } from "../../data/repositories/interfaces/workspace-member.repository";
import { WorkspaceMemberEntity } from "../../data/entities/workspace-member.entity";
import {
  Consumers,
  EventBus,
  Streams,
  Subscriber,
  WorkspaceCreatedPayload,
} from "@issue-tracker/event-bus";
import { Typeorm } from "@issue-tracker/orm";

export class WorkspaceCreatedSubscriber extends Subscriber<WorkspaceCreatedPayload> {
  readonly stream = Streams.WORKSPACE;
  readonly consumer = Consumers.WorkspaceCreatedConsumerProject;

  constructor(
    private eventBus: EventBus,
    private workspaceRepository: WorkspaceRepository,
    private orm: Typeorm,
    private workspaceMemberRepository: WorkspaceMemberRepository,
  ) {
    super(eventBus.client);
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

    const queryRunner = this.orm.createQueryRunner();
    await this.orm.transaction(queryRunner, async (queryRunner) => {
      await this.workspaceRepository.save(newWorkspace, { queryRunner });
      await this.workspaceMemberRepository.save(newWorkspaceMember, {
        queryRunner,
      });
    });

    message.ack();
    console.log("Message processing completed");
  };
}
