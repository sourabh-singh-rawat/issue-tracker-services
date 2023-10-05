import {
  QueryBuilderOptions,
  ServiceResponse,
  TransactionExecutionError,
  WorkspaceRegistrationData,
} from "@sourabhrawatcc/core-utils";
import { v4 } from "uuid";
import { RegisteredServices } from "../app/service-container";
import { WorkspaceService } from "./interfaces/workspace.service";
import { UserEntity, WorkspaceEntity } from "../data/entities";
import { WorkspaceMemberEntity } from "../data/entities/workspace-member.entity";
import { WorkspaceCreatedPublisher } from "../messages/publishers/workspace-created.publisher";

export class CoreWorkspaceService implements WorkspaceService {
  private readonly policyManager;
  private readonly databaseService;
  private readonly messageService;
  private readonly userRepository;
  private readonly workspaceRepository;
  private readonly workspaceMemberRepository;

  constructor(serviceContainer: RegisteredServices) {
    this.policyManager = serviceContainer.policyManager;
    this.databaseService = serviceContainer.databaseService;
    this.messageService = serviceContainer.messageService;
    this.userRepository = serviceContainer.userRepository;
    this.workspaceRepository = serviceContainer.workspaceRepository;
    this.workspaceMemberRepository = serviceContainer.workspaceMemberRepository;
  }

  // Optionally can also save user
  private saveWorkspace = async (
    workspace: WorkspaceEntity,
    workspaceMember: WorkspaceMemberEntity,
    user?: UserEntity,
  ) => {
    const queryRunner = this.databaseService.createQueryRunner();

    const savedWorkspace = await this.databaseService.transaction(
      queryRunner,
      async (queryRunner) => {
        if (user) {
          await this.userRepository.save(user, { queryRunner });
        }

        const savedWorkspace = await this.workspaceRepository.save(workspace, {
          queryRunner,
        });
        await this.workspaceMemberRepository.save(workspaceMember, {
          queryRunner,
        });
        await this.policyManager.createWorkspacePolicies(
          workspace.ownerUserId,
          workspace.id,
        );

        return savedWorkspace;
      },
    );

    if (!savedWorkspace) {
      throw new TransactionExecutionError(
        "Failed to save workspace, member, and policies",
      );
    }

    return savedWorkspace;
  };

  createDefaultWorkspace = async (userId: string, workspaceId: string) => {
    const newUser = new UserEntity();
    newUser.id = userId;
    newUser.defaultWorkspaceId = workspaceId;

    const newWorkspace = new WorkspaceEntity();
    newWorkspace.id = workspaceId;
    newWorkspace.name = "Default Workspace";
    newWorkspace.ownerUserId = userId;

    const newWorkspaceMember = new WorkspaceMemberEntity();
    newWorkspaceMember.userId = userId;
    newWorkspaceMember.workspaceId = workspaceId;

    const savedWorkspace = await this.saveWorkspace(
      newWorkspace,
      newWorkspaceMember,
      newUser,
    );

    const workspaceCreatedPublisher = new WorkspaceCreatedPublisher(
      this.messageService.client,
    );
    await workspaceCreatedPublisher.publish({
      id: savedWorkspace.id,
      name: savedWorkspace.name,
      ownerId: savedWorkspace.ownerUserId,
    });
  };

  createWorkspace = async (
    userId: string,
    workspace: WorkspaceRegistrationData,
  ) => {
    const { name, description } = workspace;
    const workspaceId = v4();

    const newWorkspace = new WorkspaceEntity();
    newWorkspace.id = workspaceId;
    newWorkspace.name = name;
    newWorkspace.description = description;
    newWorkspace.ownerUserId = userId;

    const newWorkspaceMember = new WorkspaceMemberEntity();
    newWorkspaceMember.userId = userId;
    newWorkspaceMember.workspaceId = workspaceId;

    const savedWorkspace = await this.saveWorkspace(
      newWorkspace,
      newWorkspaceMember,
    );

    const workspaceCreatedPublisher = new WorkspaceCreatedPublisher(
      this.messageService.client,
    );
    await workspaceCreatedPublisher.publish({
      id: savedWorkspace.id,
      name: savedWorkspace.name,
      ownerId: savedWorkspace.ownerUserId,
    });

    return new ServiceResponse({ data: savedWorkspace.id });
  };

  getAllWorkspaces = async (userId: string) => {
    const workspaces = await this.workspaceRepository.find(userId);

    return new ServiceResponse({
      data: workspaces,
      dataCount: workspaces.length,
    });
  };

  getWorkspace = async (id: string) => {
    const doesWorkspaceExists = await this.workspaceRepository.existsById(id);
    if (!doesWorkspaceExists) {
      throw Error("Workspace does not exist");
    }

    const workspace = await this.workspaceRepository.findById(id);

    return new ServiceResponse({ data: workspace });
  };
}
