import {
  TypeormStore,
  Filters,
  ProjectDetails,
  ProjectFormData,
  ProjectRoles,
  ServiceResponse,
  TransactionExecutionError,
  UserAlreadyExists,
  UserNotFoundError,
  ProjectInviteStatus,
  ProjectPermissions,
  ProjectMemberPayload,
  JwtToken,
  InternalServerError,
  ProjectNotFoundError,
} from "@sourabhrawatcc/core-utils";
import { CasbinProjectGuardian } from "../app/guardians/casbin/casbin-project.guardian";
import { ProjectService } from "./interfaces/project.service";
import { ProjectEntity, ProjectMemberEntity } from "../app/entities";
import { ProjectRepository } from "../repositories/interfaces/project.repository";
import { UserRepository } from "../repositories/interfaces/user.repository";
import { ProjectMemberRepository } from "../repositories/interfaces/project-member";
import { UserService } from "./interfaces/user.service";
import { ProjectCreatedPublisher } from "../messages/publishers/project-created.publisher";
import { ProjectUpdatedPublisher } from "../messages/publishers/project-updated.publisher";
import { WorkspaceMemberRepository } from "../repositories/interfaces/workspace-member.repository";
import { ProjectMemberCreatedPublisher } from "../messages/publishers/project-member-created.publisher";
import { ProjectStatus } from "@issue-tracker/common";

export class CoreProjectService implements ProjectService {
  constructor(
    private readonly casbinProjectGuardian: CasbinProjectGuardian,
    private readonly store: TypeormStore,
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly projectRepository: ProjectRepository,
    private readonly workspaceMemberRepository: WorkspaceMemberRepository,
    private readonly projectMemberRepository: ProjectMemberRepository,
    private readonly projectCreatedPublisher: ProjectCreatedPublisher,
    private readonly projectUpdatedPublisher: ProjectUpdatedPublisher,
    private readonly projectMemberCreatedPublisher: ProjectMemberCreatedPublisher,
  ) {}

  private getUserById = async (userId: string) => {
    return await this.userRepository.findById(userId);
  };

  private getRoleForUser = async (userId: string, projectId: string) => {
    return await this.casbinProjectGuardian.getRoleForUser(userId, projectId);
  };

  private getProjectActions = async (userId: string, projectId: string) => {
    const permissions = await this.casbinProjectGuardian.getPermissionsForUser(
      userId,
      projectId,
    );

    return permissions;
  };

  private getStatuses = () => Object.values(ProjectStatus);

  private getRoles = () => Object.values(ProjectRoles);

  getProjectMembers = async (projectId: string) => {
    const rows = await this.projectMemberRepository.findByProjectId(projectId);

    return new ServiceResponse({
      rows,
      filteredRowCount: rows.length,
    });
  };

  getProjectStatusList = () => {
    const statuses = this.getStatuses();

    return new ServiceResponse({
      rows: statuses,
      filteredRowCount: statuses.length,
    });
  };

  getProjectRoleList = () => {
    const roles = this.getRoles();

    return new ServiceResponse({ rows: roles, filteredRowCount: roles.length });
  };

  getProjectList = async (userId: string, filters: Filters) => {
    const workspaceId = await this.userService.getDefaultWorkspaceId(userId);
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
        const actions = await this.getProjectActions(userId, p.id);
        const members = (await this.getProjectMembers(p.id)).rows;
        const statuses = this.getStatuses();

        return new ProjectDetails(p, actions, statuses, members);
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

    return new ServiceResponse({ rows: project });
  };

  getWorkspaceMemberList = async (userId: string, projectId: string) => {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new UserNotFoundError();

    const rows = await this.workspaceMemberRepository.find(
      projectId,
      user.defaultWorkspaceId,
    );

    return new ServiceResponse({ rows, filteredRowCount: rows.length });
  };

  createProject = async (userId: string, formData: ProjectFormData) => {
    const user = await this.getUserById(userId);
    if (!user) throw new UserNotFoundError();

    const { name, description, startDate, endDate, status } = formData;

    const newProject = new ProjectEntity();
    newProject.name = name;
    newProject.description = description;
    newProject.startDate = startDate;
    newProject.endDate = endDate;
    newProject.status = status;
    newProject.ownerUserId = userId;
    newProject.workspaceId = user.defaultWorkspaceId;

    const queryRunner = this.store.createQueryRunner();
    const savedProject = await this.store.transaction(
      queryRunner,
      async (queryRunner) => {
        const savedProject = await this.projectRepository.save(newProject, {
          queryRunner,
        });
        const newProjectMember = new ProjectMemberEntity();
        newProjectMember.projectId = savedProject.id;
        newProjectMember.userId = userId;
        newProjectMember.role = ProjectRoles.Owner;
        newProjectMember.workspaceId = user.defaultWorkspaceId;
        newProjectMember.inviteStatus = ProjectInviteStatus.ACCEPTED;

        await this.projectMemberRepository.save(newProjectMember, {
          queryRunner,
        });

        await this.casbinProjectGuardian.createOwner(userId, savedProject.id);

        return savedProject;
      },
    );

    if (!savedProject) {
      throw new TransactionExecutionError("Cannot create project");
    }

    await this.projectCreatedPublisher.publish(savedProject);

    return new ServiceResponse({ rows: savedProject.id });
  };

  createProjectInvite = async (
    userId: string,
    projectId: string,
    role: ProjectRoles,
    invitedBy: string,
    workspaceId: string,
  ) => {
    await this.casbinProjectGuardian.validatePermission(
      invitedBy,
      projectId,
      ProjectPermissions.Invite,
    );

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

    const { projectId, userId, role } = verifiedToken;
    const updatedProjectMember = new ProjectMemberEntity();
    updatedProjectMember.inviteStatus = ProjectInviteStatus.ACCEPTED;

    await this.projectMemberRepository.updateByUserId(
      userId,
      updatedProjectMember,
    );

    switch (role) {
      case ProjectRoles.Member:
        await this.casbinProjectGuardian.createMember(userId, projectId);

      case ProjectRoles.Admin:
        await this.casbinProjectGuardian.createAdmin(userId, projectId);
    }

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
    const alreadyMember = await this.projectMemberRepository.existsByProjectId(
      userId,
      projectId,
    );
    if (alreadyMember) throw new UserAlreadyExists();

    // TODO: check if the user is member of project's workspace

    const newProjectMember = new ProjectMemberEntity();
    newProjectMember.userId = userId;
    newProjectMember.projectId = projectId;
    newProjectMember.role = role;
    newProjectMember.createdById = createdBy;
    newProjectMember.workspaceId = workspaceId;

    await this.projectMemberRepository.save(newProjectMember);

    await this.projectMemberCreatedPublisher.publish({
      userId,
      projectId,
      role,
      createdBy,
    });
  };

  updateProject = async (id: string, updatables: ProjectFormData) => {
    const { name, description, status, startDate, endDate } = updatables;
    const updatedProject = new ProjectEntity();
    updatedProject.name = name;
    updatedProject.description = description;
    updatedProject.status = status;
    updatedProject.startDate = startDate;
    updatedProject.endDate = endDate;

    await this.projectRepository.update(id, updatedProject);
    const project = await this.projectRepository.findOne(id);
    if (!project) throw new ProjectNotFoundError();

    await this.projectUpdatedPublisher.publish(project);
  };
}
