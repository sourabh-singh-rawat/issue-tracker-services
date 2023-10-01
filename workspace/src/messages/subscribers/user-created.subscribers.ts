import {
  Consumers,
  Streams,
  Subscriber,
  UserCreatedPayload,
  WorkspacePrivileges,
  WorkspaceRoles,
} from "@sourabhrawatcc/core-utils";
import { JsMsg } from "nats";
import { RegisteredServices } from "../../app/service-container";
import { UserEntity, WorkspaceEntity } from "../../data/entities";
import { WorkspaceMemberEntity } from "../../data/entities/workspace-member.entity";

export class UserCreatedSubscriber extends Subscriber<UserCreatedPayload> {
  readonly stream = Streams.USER;
  readonly consumer = Consumers.UserCreatedConsumerWorkspace;
  private readonly databaseService;
  private readonly policyManager;
  private readonly userRepository;
  private readonly workspaceRepository;
  private readonly workspaceMemberRepository;

  constructor(serviceContainer: RegisteredServices) {
    super(serviceContainer.messageService.client);

    this.policyManager = serviceContainer.policyManager;
    this.databaseService = serviceContainer.databaseService;
    this.userRepository = serviceContainer.userRepository;
    this.workspaceRepository = serviceContainer.workspaceRepository;
    this.workspaceMemberRepository = serviceContainer.workspaceMemberRepository;
  }

  onMessage = async (
    message: JsMsg,
    payload: UserCreatedPayload,
  ): Promise<void> => {
    const { userId, email, defaultWorkspaceId } = payload;

    const newUser = new UserEntity();
    newUser.id = userId;
    newUser.email = email;
    newUser.defaultWorkspaceId = defaultWorkspaceId;

    const newWorkspace = new WorkspaceEntity();
    newWorkspace.id = defaultWorkspaceId;
    newWorkspace.name = "default";
    newWorkspace.ownerUserId = userId;

    const newWorkspaceMember = new WorkspaceMemberEntity();
    newWorkspaceMember.userId = userId;
    newWorkspaceMember.workspaceId = defaultWorkspaceId;

    await this.databaseService.transaction(async (queryRunner) => {
      await this.userRepository.save(newUser, { queryRunner });
      await this.workspaceRepository.save(newWorkspace, { queryRunner });
      await this.workspaceMemberRepository.save(newWorkspaceMember, {
        queryRunner,
      });
      await this.policyManager.createWorkspacePolicies(
        userId,
        defaultWorkspaceId,
      );
    });

    message.ack();
    console.log("Message processing completed");
  };
}
