import { ProjectService } from "./interfaces/project.service";
import { UserService } from "./interfaces/user.service";
import { Typeorm } from "@issue-tracker/orm";
import { ProjectStatus } from "@issue-tracker/common/dist/constants/enums/project-status";
import {
  Filters,
  InternalServerError,
  ProjectDetails,
  ProjectFormData,
  ProjectInviteStatus,
  ProjectNotFoundError,
  ProjectRoles,
  ServiceResponse,
  TransactionExecutionError,
  UserAlreadyExists,
  UserNotFoundError,
} from "@issue-tracker/common";
import { NatsPublisher, ProjectMemberPayload } from "@issue-tracker/event-bus";
import { JwtToken } from "@issue-tracker/security";
import { UserRepository } from "../data/repositories/interfaces/user.repository";
import { ProjectRepository } from "../data/repositories/interfaces/project.repository";
import { WorkspaceMemberRepository } from "../data/repositories/interfaces/workspace-member.repository";
import { ProjectMemberRepository } from "../data/repositories/interfaces/project-member";
import { List } from "../data/entities";

export class CoreProjectService implements ProjectService {
  constructor(
    private readonly orm: Typeorm,
    private readonly publisher: NatsPublisher,
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly projectRepository: ProjectRepository,
    private readonly workspaceMemberRepository: WorkspaceMemberRepository,
  ) {}

  private getUserById = async (userId: string) => {
    return await this.userRepository.findById(userId);
  };

  private getStatuses = () => Object.values(ProjectStatus);

  private getRoles = () => Object.values(ProjectRoles);

  getProjectStatusList = () => {
    const statuses = this.getStatuses();

    return new ServiceResponse({
      rows: statuses,
      rowCount: statuses.length,
    });
  };

  getProjectRoleList = () => {
    const roles = this.getRoles();

    return new ServiceResponse({ rows: roles, filteredRowCount: roles.length });
  };

  getAllProjects = async (userId: string, filters: Filters) => {
    const user = await this.userService.getDefaultWorkspaceId(userId);

    if (!user) throw new UserNotFoundError();
    const workspaceId = user.defaultWorkspaceId;
    const projects = await this.projectRepository.find(
      userId,
      workspaceId,
      filters,
    );
    const rowCount = await this.projectRepository.findCount(
      userId,
      workspaceId,
    );

    const rows = await Promise.all(
      projects.map(async (p) => {
        const statuses = this.getStatuses();

        return new ProjectDetails(p, [], statuses, []);
      }),
    );

    return new ServiceResponse({
      rows,
      rowCount,
      filteredRowCount: rows.length,
    });
  };

  getProject = async (id: string) => {
    const project = await this.projectRepository.findOne(id);
    if (!project) throw new ProjectNotFoundError();

    return project;
  };

  getWorkspaceMemberList = async (userId: string) => {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new UserNotFoundError();

    const rows = await this.workspaceMemberRepository.find(
      user.defaultWorkspaceId,
    );

    return new ServiceResponse({ rows, filteredRowCount: rows.length });
  };

  createProject = async (userId: string, formData: ProjectFormData) => {
    const user = await this.getUserById(userId);
    if (!user) throw new UserNotFoundError();

    const { name, description, startDate, endDate, status } = formData;

    const newProject = new List();
    newProject.name = name;
    newProject.description = description;
    newProject.startDate = startDate;
    newProject.endDate = endDate;
    newProject.status = status;
    newProject.ownerUserId = userId;
    newProject.workspaceId = user.defaultWorkspaceId;

    const queryRunner = this.orm.createQueryRunner();
    const savedProject = await this.orm.transaction(
      queryRunner,
      async (queryRunner) => {
        const savedProject = await this.projectRepository.save(newProject, {
          queryRunner,
        });
        return savedProject;
      },
    );

    if (!savedProject) {
      throw new TransactionExecutionError("Cannot create project");
    }
    await this.publisher.send("project.created", savedProject);

    return new ServiceResponse({ rows: savedProject.id });
  };

  createProjectInvite = async (
    userId: string,
    projectId: string,
    role: ProjectRoles,
    invitedBy: string,
    workspaceId: string,
  ) => {
    // await this.casbinProjectGuardian.createAdmin(userId, projectId);
    await this.createProjectMember(
      userId,
      projectId,
      role,
      invitedBy,
      workspaceId,
    );
  };

  confirmProjectInvite = async (token: string) => {
    let verifiedToken: ProjectMemberPayload;
    try {
      verifiedToken = JwtToken.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      throw new InternalServerError("Token verification failed");
    }

    const { userId } = verifiedToken;

    return new ServiceResponse({
      rows: "Member added successfully(confirmed)",
    });
  };

  createProjectMember = async (
    userId: string,
    projectId: string,
    role: ProjectRoles,
    createdBy: string,
    workspaceId: string,
  ) => {
    await this.publisher.send("project.member-invited", {
      userId,
      projectId,
      role,
      createdBy,
    });
  };

  updateProject = async (id: string, updatables: ProjectFormData) => {
    const { name, description, status, startDate, endDate } = updatables;
    const updatedProject = new List();
    updatedProject.name = name;
    updatedProject.description = description;
    updatedProject.status = status;
    updatedProject.startDate = startDate;
    updatedProject.endDate = endDate;

    await this.projectRepository.update(id, updatedProject);
    const project = await this.projectRepository.findOne(id);
    if (!project) throw new ProjectNotFoundError();

    await this.publisher.send("project.updated", project);
  };
}
