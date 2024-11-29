import { v4 } from "uuid";
import {
  CreateDefaultWorkspaceOptions,
  CreateWorkspaceOptions,
  WorkspaceService,
} from "./interfaces/WorkspaceService";
import { WorkspaceMember } from "../data/entities/WorkspaceMember";
import { WorkspaceInvitation } from "../data/entities/WorkspaceInvitation";
import { ServiceOptions, Typeorm } from "@issue-tracker/orm";
import {
  ServiceResponse,
  UserNotFoundError,
  WORKSPACE_MEMBER_STATUS,
  WorkspaceNotFound,
  WorkspaceMemberRoles,
  WORKSPACE_MEMBER_ROLES,
  UserAlreadyMember,
  EMAIL_VERIFICATION_TOKEN_STATUS,
  NotFoundError,
} from "@issue-tracker/common";
import {
  NatsPublisher,
  WorkspaceInvitePayload,
} from "@issue-tracker/event-bus";
import { JwtToken } from "@issue-tracker/security";
import { UserRepository } from "../data/repositories/interfaces/user.repository";
import { WorkspaceRepository } from "../data/repositories/interfaces/workspace.repository";
import { WorkspaceMemberRepository } from "../data/repositories/interfaces/workspace-member.repository";
import { WorkspaceInviteTokenRepository } from "../data/repositories/interfaces/workspace-invite-token.repository";
import { Workspace } from "../data/entities/Workspace";
import { User } from "../data/entities";

export interface SaveWorkspaceOptions extends ServiceOptions {
  workspace: Workspace;
  workspaceMember: WorkspaceMember;
  user?: User;
}

export class CoreWorkspaceService implements WorkspaceService {
  constructor(
    private orm: Typeorm,
    private readonly publisher: NatsPublisher,
    private userRepository: UserRepository,
    private workspaceRepository: WorkspaceRepository,
    private workspaceMemberRepository: WorkspaceMemberRepository,
    private workspaceInviteTokenRepository: WorkspaceInviteTokenRepository,
  ) {}

  private async saveWorkspace(options: SaveWorkspaceOptions) {
    const { manager, workspace, workspaceMember, user } = options;
    const UserRepo = manager.getRepository(User);
    const WorkspaceRepo = manager.getRepository(Workspace);
    const WorkspaceMemberRepo = manager.getRepository(WorkspaceMember);

    if (user) await UserRepo.save(user);
    const savedWorkspace = await WorkspaceRepo.save(workspace);
    const savedWorkspaceMember =
      await WorkspaceMemberRepo.save(workspaceMember);

    if (!savedWorkspaceMember.userId) throw new Error("userId is required");

    await this.publisher.send("workspace.created", {
      id: savedWorkspace.id,
      name: savedWorkspace.name,
      createdById: savedWorkspace.createdById,
      member: {
        userId: savedWorkspaceMember.userId,
        workspaceId: savedWorkspaceMember.workspaceId,
      },
    });

    return savedWorkspace;
  }

  async createDefaultWorkspace(options: CreateDefaultWorkspaceOptions) {
    const { manager, user } = options;
    const { defaultWorkspaceId, id } = user;

    const workspace = new Workspace();
    workspace.id = defaultWorkspaceId;
    workspace.name = "Default Workspace";
    workspace.createdById = id;

    const workspaceMember = new WorkspaceMember();
    workspaceMember.userId = id;
    workspaceMember.workspaceId = defaultWorkspaceId;

    await this.saveWorkspace({ workspace, workspaceMember, user, manager });
  }

  async createWorkspace(options: CreateWorkspaceOptions) {
    const { name, description, userId, manager } = options;
    const id = v4();

    const workspace = new Workspace();
    workspace.id = id;
    workspace.name = name;
    workspace.description = description;
    workspace.createdById = userId;

    const workspaceMember = new WorkspaceMember();
    workspaceMember.userId = userId;
    workspaceMember.workspaceId = id;

    const savedWorkspace = await this.saveWorkspace({
      workspace,
      workspaceMember,
      manager,
    });

    return savedWorkspace.id;
  }

  createWorkspaceMember = async (
    userId: string,
    email: string,
    role: WorkspaceMemberRoles,
  ) => {
    const isReceiverMember =
      await this.workspaceMemberRepository.existsByEmail(email);
    if (isReceiverMember) throw new UserAlreadyMember();

    const sender = await this.userRepository.findById(userId);
    if (!sender) throw new UserNotFoundError();
    const { defaultWorkspaceId } = sender;

    const workspace =
      await this.workspaceRepository.findById(defaultWorkspaceId);
    if (!workspace) throw new NotFoundError("Workspace Not Found");

    const workspaceMember = new WorkspaceMember();
    workspaceMember.email = email;
    workspaceMember.role = role;
    workspaceMember.workspaceId = defaultWorkspaceId;
    workspaceMember.status = WORKSPACE_MEMBER_STATUS.PENDING;

    const jwtid = v4();
    const exp = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
    const token = JwtToken.create(
      {
        userId,
        iss: "@issue-tracker/issue-tracker",
        aud: "client",
        sub: userId,
        exp,
        jwtid,
        email,
        role,
      },
      process.env.JWT_SECRET!,
    );

    const newWorkspaceInviteToken = new WorkspaceInvitation();
    newWorkspaceInviteToken.id = jwtid;
    newWorkspaceInviteToken.userId = userId;
    newWorkspaceInviteToken.createdAt = new Date();
    newWorkspaceInviteToken.status = EMAIL_VERIFICATION_TOKEN_STATUS.VALID;
    newWorkspaceInviteToken.token = token;
    newWorkspaceInviteToken.expiresAt = new Date(exp * 1000);

    const queryRunner = this.orm.createQueryRunner();
    this.orm.transaction(queryRunner, async (queryRunner) => {
      await this.workspaceMemberRepository.save(workspaceMember, {
        queryRunner,
      });
      await this.workspaceInviteTokenRepository.save(newWorkspaceInviteToken, {
        queryRunner,
      });
      await this.publisher.send("workspace.member-invited", {
        userId,
        email,
        token,
        status: EMAIL_VERIFICATION_TOKEN_STATUS.VALID,
        workspaceId: workspace.id,
        workspaceName: workspace.name,
      });
    });
  };

  confirmWorkspaceInvite = async (token: string) => {
    let verifedToken: WorkspaceInvitePayload;
    try {
      verifedToken = JwtToken.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      throw new Error("Token verification failed");
    }

    const { email } = verifedToken;
    const userExists = await this.userRepository.findByEmail(email);

    if (!userExists) {
      return new ServiceResponse({
        rows: `http://localhost:3000/signup?inviteToken=${token}`,
      });
    }

    return new ServiceResponse({
      rows: `htt://localhost:3000/login?inviteToken=${token}`,
    });
  };

  async getAllWorkspaces(userId: string) {
    return await this.workspaceRepository.find(userId);
  }

  getWorkspace = async (id: string) => {
    const workspace = await this.workspaceRepository.findById(id);
    if (!workspace) throw new WorkspaceNotFound();

    return new ServiceResponse({ rows: workspace });
  };

  getWorkspaceRoleList = async () => {
    const rows = Object.values(WORKSPACE_MEMBER_ROLES);
    return new ServiceResponse({ rows, rowCount: rows.length });
  };

  getWorkspaceMembers = async (workspaceId: string) => {
    const rows = await this.workspaceMemberRepository.find(workspaceId);

    return new ServiceResponse({ rows, filteredRowCount: rows.length });
  };

  updateWorkspace = async (id: string, updateables: { name?: string }) => {
    const workspace = await Workspace.findOne({ where: { id } });

    if (!workspace) throw new WorkspaceNotFound();

    const { name } = updateables;
    if (name) workspace.name = name;

    await workspace.save();

    return new ServiceResponse({ rows: id });
  };
}
