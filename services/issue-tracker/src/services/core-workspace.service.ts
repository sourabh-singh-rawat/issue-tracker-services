import { v4 } from "uuid";
import { WorkspaceService } from "./interfaces/workspace.service";
import { WorkspaceMemberEntity } from "../data/entities/workspace-member.entity";
import { WorkspaceMemberInviteEntity } from "../data/entities/workspace-member-invite.entity";
import { WorkspaceCreatedPublisher } from "../events/publishers/workspace-created.publisher";
import { WorkspaceInviteCreatedPublisher } from "../events/publishers/workspace-invite-created.publisher";
import { Typeorm } from "@issue-tracker/orm";
import {
  ServiceResponse,
  TransactionExecutionError,
  UserAlreadyExists,
  UserNotFoundError,
  WORKSPACE_MEMBER_STATUS,
  WorkspaceNotFound,
  WorkspaceRegistrationData,
  WorkspaceMemberRoles,
  WORKSPACE_MEMBER_ROLES,
} from "@issue-tracker/common";
import { WorkspaceInvitePayload } from "@issue-tracker/event-bus";
import { JwtToken } from "@issue-tracker/security";
import { UserRepository } from "../data/repositories/interfaces/user.repository";
import { WorkspaceRepository } from "../data/repositories/interfaces/workspace.repository";
import { WorkspaceMemberRepository } from "../data/repositories/interfaces/workspace-member.repository";
import { WorkspaceMemberInviteRepository } from "../data/repositories/interfaces/workspace-member-invite.repository";
import { WorkspaceEntity } from "../data/entities/workspace.entity";
import { UserEntity } from "../data/entities";

export class CoreWorkspaceService implements WorkspaceService {
  constructor(
    private orm: Typeorm,
    private userRepository: UserRepository,
    private workspaceRepository: WorkspaceRepository,
    private workspaceMemberRepository: WorkspaceMemberRepository,
    private workspaceCreatedPublisher: WorkspaceCreatedPublisher,
    private workspaceMemberInviteRepository: WorkspaceMemberInviteRepository,
    private workspaceInviteCreatedPublisher: WorkspaceInviteCreatedPublisher,
  ) {}

  private saveWorkspace = async (
    workspace: WorkspaceEntity,
    workspaceMember: WorkspaceMemberEntity,
    user?: UserEntity,
  ) => {
    const queryRunner = this.orm.createQueryRunner();
    const result = await this.orm.transaction(
      queryRunner,
      async (queryRunner) => {
        if (user) {
          await this.userRepository.save(user, { queryRunner });
        }

        const savedWorkspace = await this.workspaceRepository.save(workspace, {
          queryRunner,
        });
        const savedWorkspaceMember = await this.workspaceMemberRepository.save(
          workspaceMember,
          { queryRunner },
        );

        return { savedWorkspace, savedWorkspaceMember };
      },
    );

    if (!result) {
      throw new TransactionExecutionError(
        "Failed to save workspace, member, and policies",
      );
    }

    const { savedWorkspace, savedWorkspaceMember } = result;
    await this.workspaceCreatedPublisher.publish({
      id: savedWorkspace.id,
      name: savedWorkspace.name,
      ownerId: savedWorkspace.ownerUserId,
      member: {
        userId: savedWorkspaceMember.userId,
        workspaceId: savedWorkspaceMember.workspaceId,
      },
    });

    return savedWorkspace;
  };

  createDefaultWorkspace = async (user: UserEntity) => {
    const { defaultWorkspaceId, id } = user;

    const newWorkspace = new WorkspaceEntity();
    newWorkspace.id = defaultWorkspaceId;
    newWorkspace.name = "Default Workspace";
    newWorkspace.ownerUserId = id;

    const newWorkspaceMember = new WorkspaceMemberEntity();
    newWorkspaceMember.userId = id;
    newWorkspaceMember.workspaceId = defaultWorkspaceId;

    await this.saveWorkspace(newWorkspace, newWorkspaceMember, user);
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

    return new ServiceResponse({ rows: savedWorkspace.id });
  };

  createWorkspaceMember = async (userId: string, workspaceId: string) => {
    const isMember = await this.workspaceMemberRepository.existsByUserId(
      userId,
      workspaceId,
    );

    if (isMember) throw new UserAlreadyExists();

    const newWorkspaceMember = new WorkspaceMemberEntity();
    newWorkspaceMember.userId = userId;
    newWorkspaceMember.workspaceId = workspaceId;

    await this.workspaceMemberRepository.save(newWorkspaceMember);
  };

  createWorkspaceInvite = async (
    userId: string,
    email: string,
    role: WorkspaceMemberRoles,
  ) => {
    const sender = await this.userRepository.findById(userId);
    if (!sender) throw new UserNotFoundError();
    const { defaultWorkspaceId } = sender;

    const isReceiverMember = await this.workspaceMemberRepository.existsById(
      email,
    );
    if (isReceiverMember) throw new UserAlreadyExists();

    const newWorkspaceMemberInvite = new WorkspaceMemberInviteEntity();
    newWorkspaceMemberInvite.senderId = userId;
    newWorkspaceMemberInvite.receiverEmail = email;
    newWorkspaceMemberInvite.workspaceId = defaultWorkspaceId;
    newWorkspaceMemberInvite.status = WORKSPACE_MEMBER_STATUS.PENDING;

    const { status } = await this.workspaceMemberInviteRepository.save(
      newWorkspaceMemberInvite,
    );

    await this.workspaceInviteCreatedPublisher.publish({
      senderId: userId,
      senderEmail: sender.email,
      senderName: sender.displayName,
      receiverEmail: email,
      receiverStatus: status,
      receiverRole: role,
      workspaceId: defaultWorkspaceId,
    });
  };

  /**
   * Should confirm workspace invites,
   * if confirmed and user is already logged in then add the user as member
   *
   * redirect the user to signup page with token
   */
  confirmWorkspaceInvite = async (token: string) => {
    let verifedToken: WorkspaceInvitePayload;
    try {
      verifedToken = JwtToken.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      throw new Error("Token verification failed");
    }

    // Token verified, check if the user is a account holder
    const { receiverEmail } = verifedToken;
    const userExists = await this.userRepository.findByEmail(receiverEmail);

    if (!userExists) {
      return new ServiceResponse({
        rows: `https://localhost:3000/signup?inviteToken=${token}`,
      });
    }

    return new ServiceResponse({
      rows: `http://localhost:3000/login?inviteToken=${token}`,
    });
  };

  getAllWorkspaces = async (userId: string) => {
    const workspaces = await this.workspaceRepository.find(userId);

    return new ServiceResponse({
      rows: workspaces,
      filteredRowCount: workspaces.length,
    });
  };

  getWorkspace = async (id: string) => {
    const workspace = await this.workspaceRepository.findById(id);
    if (!workspace) throw new WorkspaceNotFound();

    return new ServiceResponse({ rows: workspace });
  };

  getWorkspaceRoleList = async () => {
    return new ServiceResponse({ rows: Object.values(WORKSPACE_MEMBER_ROLES) });
  };

  getWorkspaceMembers = async (workspaceId: string) => {
    const rows = await this.workspaceMemberRepository.find(workspaceId);

    return new ServiceResponse({ rows, filteredRowCount: rows.length });
  };

  updateWorkspace = async (id: string, updateables: { name?: string }) => {
    const workspace = await WorkspaceEntity.findOne({ where: { id } });

    if (!workspace) throw new WorkspaceNotFound();

    const { name } = updateables;
    if (name) workspace.name = name;

    await workspace.save();

    return new ServiceResponse({ rows: id });
  };
}
