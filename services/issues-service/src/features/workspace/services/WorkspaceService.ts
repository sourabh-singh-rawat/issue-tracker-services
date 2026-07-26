import {
  EMAIL_VERIFICATION_TOKEN_STATUS,
  NotFoundError,
  ServiceResponse,
  UserAlreadyMember,
  UserNotFoundError,
  WORKSPACE_MEMBER_ROLES,
  WORKSPACE_MEMBER_STATUS,
  WORKSPACE_STATUS,
  WorkspaceMemberRoles,
  WorkspaceNotFound,
  uuidv7,
} from "@pine/common";
import { type IPublisher, SUBJECTS } from "@pine/events";
import { ServiceOptions, Typeorm } from "@pine/orm";
import { JwtToken, hasEmailClaim } from "@pine/security";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { User } from "@/entities/User";
import { Workspace } from "@/entities/Workspace";
import { WorkspaceInvitation } from "@/entities/WorkspaceInvitation";
import { WorkspaceMember } from "@/entities/WorkspaceMember";
import { env } from "@/env";
import {
  CreateDefaultWorkspaceOptions,
  CreateWorkspaceOptions,
  IWorkspaceService,
} from "./IWorkspaceService";

export interface SaveWorkspaceOptions extends ServiceOptions {
  workspace: Workspace;
  workspaceMember: WorkspaceMember;
  user?: User;
}

@injectable()
export class WorkspaceService implements IWorkspaceService {
  constructor(
    @inject(TYPES.Orm)
    private readonly orm: Typeorm,
    @inject(TYPES.Publisher)
    private readonly publisher: IPublisher,
  ) {}

  private async saveWorkspace(options: SaveWorkspaceOptions) {
    const { manager, workspace, workspaceMember, user } = options;
    // const UserRepo = manager.getRepository(User);
    // const WorkspaceRepo = manager.getRepository(Workspace);
    // const WorkspaceMemberRepo = manager.getRepository(WorkspaceMember);

    // if (user) await UserRepo.save(user);
    // const savedWorkspace = await WorkspaceRepo.save(workspace);
    // const savedWorkspaceMember =
    //   await WorkspaceMemberRepo.save(workspaceMember);

    // if (!savedWorkspaceMember.userId) throw new Error("userId is required");

    // await this.publisher.send(SUBJECTS.WORKSPACE_CREATED, {
    //   id: savedWorkspace.id,
    //   name: savedWorkspace.name,
    //   createdById: savedWorkspace.createdById,
    //   member: {
    //     userId: savedWorkspaceMember.userId,
    //     workspaceId: savedWorkspaceMember.workspaceId,
    //   },
    // });

    return "";
  }

  async createDefaultWorkspace(options: CreateDefaultWorkspaceOptions) {
    const { manager, user } = options;
    const { id } = user;
    const workspaceId = uuidv7();

    const workspace = new Workspace();
    workspace.id = workspaceId;
    workspace.name = "Default Workspace";
    workspace.createdById = id;

    const workspaceMember = new WorkspaceMember();
    workspaceMember.userId = id;
    workspaceMember.workspaceId = workspaceId;

    await this.saveWorkspace({ workspace, workspaceMember, user, manager });
  }

  async createWorkspace(options: CreateWorkspaceOptions) {
    const { name, description, userId, manager } = options;
    const id = uuidv7();

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

    return "";
  }

  createWorkspaceMember = async (userId: string, email: string, role: WorkspaceMemberRoles) => {
    const isReceiverMember = await WorkspaceMember.findOne({
      where: { email },
    });
    if (isReceiverMember) throw new UserAlreadyMember();

    const sender = await User.findOne({ where: { id: userId } });
    if (!sender) throw new UserNotFoundError();

    const workspace = await this.findDefaultWorkspace(userId);
    if (!workspace) throw new NotFoundError("Workspace Not Found");

    const workspaceMember = new WorkspaceMember();
    workspaceMember.email = email;
    workspaceMember.role = role;
    workspaceMember.workspaceId = workspace.id;
    workspaceMember.status = WORKSPACE_MEMBER_STATUS.PENDING;

    const jwtid = uuidv7();
    const exp = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
    const token = await JwtToken.create(
      {
        userId,
        iss: "@pine/issue-tracker",
        aud: "client",
        sub: userId,
        exp,
        jwtid,
        email,
        role,
      },
      env.JWT_SECRET,
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
      await WorkspaceMember.save(workspaceMember);
      await WorkspaceInvitation.save(newWorkspaceInviteToken);
      await this.publisher.send(SUBJECTS.WORKSPACE_MEMBER_INVITED, {
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
    try {
      const verifedToken = await JwtToken.verify(token, env.JWT_SECRET);
      if (!hasEmailClaim(verifedToken)) {
        throw new Error("Token verification failed");
      }
    } catch (error) {
      throw new Error("Token verification failed");
    }

    return new ServiceResponse({
      rows: `${env.ISSUES_WEB_URL}/login?inviteToken=${token}`,
    });
  };

  async findWorkspaces(userId: string) {
    return await Workspace.find({ where: { createdById: userId } });
  }

  async findDefaultWorkspace(userId: string) {
    return await Workspace.findOneOrFail({
      where: { createdById: userId, status: WORKSPACE_STATUS.DEFAULT },
    });
  }

  getWorkspace = async (id: string) => {
    const workspace = await Workspace.findOne({ where: { id } });
    if (!workspace) throw new WorkspaceNotFound();

    return new ServiceResponse({ rows: workspace });
  };

  getWorkspaceRoleList = async () => {
    const rows = Object.values(WORKSPACE_MEMBER_ROLES);
    return new ServiceResponse({ rows, rowCount: rows.length });
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
