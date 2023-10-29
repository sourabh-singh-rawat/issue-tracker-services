import {
  DatabaseService,
  Filters,
  ProjectDetails,
  ProjectFormData,
  ProjectMember,
  ProjectStatus,
  ServiceResponse,
  TransactionExecutionError,
  UserNotFoundError,
} from "@sourabhrawatcc/core-utils";
import { ProjectService } from "./interfaces/project.service";
import { ProjectEntity, ProjectMemberEntity } from "../data/entities";
import { ProjectRepository } from "../data/repositories/interfaces/project.repository";
import { ProjectCasbinPolicyManager } from "../app/project-policy-manager";
import { UserRepository } from "../data/repositories/interfaces/user.repository";
import { ProjectMemberRepository } from "../data/repositories/interfaces/project-member";
import { UserService } from "./interfaces/user.service";
import { ProjectCreatedPublisher } from "../messages/publishers/project-created.publisher";
import { ProjectUpdatedPublisher } from "../messages/publishers/project-updated.publisher";

export class CoreProjectService implements ProjectService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly projectPolicyManager: ProjectCasbinPolicyManager,
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly projectRepository: ProjectRepository,
    private readonly projectMemberRepository: ProjectMemberRepository,
    private readonly projectCreatedPublisher: ProjectCreatedPublisher,
    private readonly projectUpdatedPublisher: ProjectUpdatedPublisher,
  ) {}

  private getUserById = async (userId: string) => {
    return await this.userRepository.findById(userId);
  };

  private getRoleForUser = async (userId: string, projectId: string) => {
    return await this.projectPolicyManager.getRoleForUser(userId, projectId);
  };

  private getProjectActions = async (userId: string, projectId: string) => {
    return await this.projectPolicyManager.getPermissionsForUser(
      userId,
      projectId,
    );
  };

  private getStatuses = () => Object.values(ProjectStatus);

  getProjectMembers = async (projectId: string) => {
    const members =
      await this.projectMemberRepository.findByProjectId(projectId);

    const rows = await Promise.all(
      members.map(async (member) => {
        const { id, email, name, memberUserId, createdAt, updatedAt } = member;
        const role = await this.getRoleForUser(member.memberUserId, projectId);

        return new ProjectMember({
          id,
          name,
          email,
          userId: memberUserId,
          createdAt,
          updatedAt,
          role: role.split(":")[1],
        });
      }),
    );

    return new ServiceResponse({
      rows,
      filteredRowCount: members.length,
    });
  };

  /**
   * Create a new project, adds the creator as project member, and creates permissions
   * @param userId
   * @param formData
   */
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

    const queryRunner = this.databaseService.createQueryRunner();
    const savedProject = await this.databaseService.transaction(
      queryRunner,
      async (queryRunner) => {
        const savedProject = await this.projectRepository.save(newProject, {
          queryRunner,
        });
        const newProjectMember = new ProjectMemberEntity();
        newProjectMember.projectId = savedProject.id;
        newProjectMember.memberUserId = userId;

        await this.projectMemberRepository.save(newProjectMember, {
          queryRunner,
        });

        await this.projectPolicyManager.createProjectPolicies(
          userId,
          savedProject.id,
        );

        return savedProject;
      },
    );

    if (!savedProject) {
      throw new TransactionExecutionError("Cannot create project");
    }

    await this.projectCreatedPublisher.publish(savedProject);

    return new ServiceResponse({ rows: savedProject.id });
  };

  /**
   * Get the project status list
   */
  getProjectStatusList = () => {
    const statuses = this.getStatuses();

    return new ServiceResponse({
      rows: statuses,
      filteredRowCount: statuses.length,
    });
  };

  /**
   * Gets all user projects in a workspace with members, and permissions
   * @param userId
   * @param filters
   */
  getProjectList = async (userId: string, filters: Filters) => {
    const { rows: workspaceId } =
      await this.userService.getDefaultWorkspaceId(userId);

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

    return new ServiceResponse({ rows: project });
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

    await this.projectUpdatedPublisher.publish(project);
  };
}
