import { STATUS_TYPE, UserNotFoundError } from "@pine/common";
import {
  createCloudEvent,
  type IPublisher,
  ProjectCreatedEvent,
  ProjectUpdatedEvent,
} from "@pine/events";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { IStatusService } from "@/features/status/services/IStatusService";
import { Project } from "@/entities/Project";
import { User } from "@/entities/User";
import { IUserService } from "@/features/user/services/IUserService";
import {
  CreateProjectOptions,
  FindProjectOptions,
  FindProjectsOptions,
  IProjectService,
  UpdateProjectOptions,
} from "./IProjectService";

@injectable()
export class ProjectService implements IProjectService {
  constructor(
    @inject(TYPES.Publisher)
    private readonly publisher: IPublisher,
    @inject(TYPES.UserService)
    private readonly userService: IUserService,
    @inject(TYPES.StatusService)
    private readonly statusService: IStatusService,
  ) {}

  private async getUserById(userId: string) {
    return await User.findOne({ where: { id: userId } });
  }

  private toProjectEventData(project: Project) {
    return {
      id: project.id,
      name: project.name,
      status: "active",
      ownerUserId: project.createdById,
      workspaceId: project.workspaceId,
      createdAt: project.createdAt.toISOString(),
      ...(project.updatedAt != null ? { updatedAt: project.updatedAt.toISOString() } : {}),
    };
  }

  async createProject(options: CreateProjectOptions) {
    const { manager, name, userId, workspaceId } = options;
    const user = await this.getUserById(userId);
    const ProjectRepo = manager.getRepository(Project);
    if (!user) throw new UserNotFoundError();

    const savedProject = await ProjectRepo.save({
      name,
      createdById: userId,
      workspaceId,
    });
    const { id: projectId } = savedProject;

    await this.statusService.createOptions({
      manager,
      projectId,
      statuses: [
        { name: "To Do", type: STATUS_TYPE.NOT_STARTED, orderIndex: 0 },
        { name: "In Progress", type: STATUS_TYPE.ACTIVE, orderIndex: 1 },
        { name: "Done", type: STATUS_TYPE.COMPLETED, orderIndex: 2 },
        { name: "Cancelled", type: STATUS_TYPE.CLOSED, orderIndex: 3 },
      ],
    });

    const event = createCloudEvent({
      type: ProjectCreatedEvent.type,
      version: ProjectCreatedEvent.version,
      schema: ProjectCreatedEvent.schema,
      source: "pine/issues-service",
      subject: savedProject.id,
      data: this.toProjectEventData(savedProject),
    });
    await this.publisher.send(event);

    return projectId;
  }

  async findProjects(options: FindProjectsOptions) {
    const { page, pageSize, userId, workspaceId: filterWorkspaceId } = options;
    const workspaceId = filterWorkspaceId ?? (await this.userService.getDefaultWorkspaceId(userId));

    const [rows, rowCount] = await Project.findAndCount({
      where: { workspaceId },
      skip: page,
      take: pageSize,
      relations: { workspace: true },
    });

    return { rows, rowCount };
  }

  async findProject(options: FindProjectOptions) {
    const { id, userId } = options;
    return await Project.findOneOrFail({
      where: { id, createdById: userId },
      relations: { workspace: true },
    });
  }

  async updateProject(options: UpdateProjectOptions) {
    const { manager, id, name } = options;
    const ProjectRepo = manager.getRepository(Project);

    await ProjectRepo.update({ id }, { name });
    const updatedProject = await ProjectRepo.findOneOrFail({ where: { id } });

    const event = createCloudEvent({
      type: ProjectUpdatedEvent.type,
      version: ProjectUpdatedEvent.version,
      schema: ProjectUpdatedEvent.schema,
      source: "pine/issues-service",
      subject: updatedProject.id,
      data: this.toProjectEventData(updatedProject),
    });
    await this.publisher.send(event);
  }
}
