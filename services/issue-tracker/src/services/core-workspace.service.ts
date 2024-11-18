import { v4 } from "uuid";
import { WorkspaceService } from "./interfaces/workspace.service";
import { WorkspaceMember } from "../data/entities/WorkspaceMember";
import { WorkspaceInvitation } from "../data/entities/WorkspaceInvitation";
import { Typeorm } from "@issue-tracker/orm";
import {
  ServiceResponse,
  TransactionExecutionError,
  UserNotFoundError,
  WORKSPACE_MEMBER_STATUS,
  WorkspaceNotFound,
  WorkspaceRegistrationData,
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
import { Workspce } from "../data/entities/Workspace";
import { User } from "../data/entities";

export class CoreWorkspaceService implements WorkspaceService {
  constructor(
    private orm: Typeorm,
    private readonly publisher: NatsPublisher,
    private userRepository: UserRepository,
    private workspaceRepository: WorkspaceRepository,
    private workspaceMemberRepository: WorkspaceMemberRepository,
    private workspaceInviteTokenRepository: WorkspaceInviteTokenRepository,
  ) {}

  private saveWorkspace = async (
    workspace: Workspce,
    workspaceMember: WorkspaceMember,
    user?: User,
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

        if (!savedWorkspaceMember.userId) throw new Error("userId is required");

        await this.publisher.send("workspace.created", {
          id: savedWorkspace.id,
          name: savedWorkspace.name,
          ownerId: savedWorkspace.ownerUserId,
          member: {
            userId: savedWorkspaceMember.userId,
            workspaceId: savedWorkspaceMember.workspaceId,
          },
        });

        return { savedWorkspace };
      },
    );

    if (!result) {
      throw new TransactionExecutionError(
        "Failed to save workspace, member, and policies",
      );
    }

    const { savedWorkspace } = result;

    return savedWorkspace;
  };

  createDefaultWorkspace = async (user: User) => {
    const { defaultWorkspaceId, id } = user;

    const newWorkspace = new Workspce();
    newWorkspace.id = defaultWorkspaceId;
    newWorkspace.name = "Default Workspace";
    newWorkspace.ownerUserId = id;

    const newWorkspaceMember = new WorkspaceMember();
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

    const newWorkspace = new Workspce();
    newWorkspace.id = workspaceId;
    newWorkspace.name = name;
    newWorkspace.description = description;
    newWorkspace.ownerUserId = userId;

    const newWorkspaceMember = new WorkspaceMember();
    newWorkspaceMember.userId = userId;
    newWorkspaceMember.workspaceId = workspaceId;

    const savedWorkspace = await this.saveWorkspace(
      newWorkspace,
      newWorkspaceMember,
    );

    return new ServiceResponse({ rows: savedWorkspace.id });
  };

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

  getAllWorkspaces = async (userId: string) => {
    const workspaces = await this.workspaceRepository.find(userId);

    return new ServiceResponse({
      rows: workspaces,
      rowCount: workspaces.length,
    });
  };

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
    const workspace = await Workspce.findOne({ where: { id } });

    if (!workspace) throw new WorkspaceNotFound();

    const { name } = updateables;
    if (name) workspace.name = name;

    await workspace.save();

    return new ServiceResponse({ rows: id });
  };
}
