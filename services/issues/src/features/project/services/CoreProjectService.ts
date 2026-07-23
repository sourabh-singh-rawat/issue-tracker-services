import { STATUS_TYPE, UserNotFoundError } from "@pine/common";
import { NatsPublisher } from "@pine/event-bus";
import { UserService } from "@/features/user/services/interfaces/UserService";
import { StatusService } from "@/features/status/services/interfaces/StatusService";
import { User } from "@/features/user/entities/User";
import { Project } from "../entities/Project";
import {
  CreateProjectOptions,
  FindProjectOptions,
  FindProjectsOptions,
  ProjectService,
  UpdateProjectOptions,
} from "./interfaces/ProjectService";

export class CoreProjectService implements ProjectService {
  constructor(
    private readonly publisher: NatsPublisher,
    private readonly userService: UserService,
    private readonly statusService: StatusService,
  ) {}

  private async getUserById(userId: string) {
    return await User.findOne({ where: { id: userId } });
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
    await this.publisher.send("project.created", savedProject);

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

    const updatedProject = await ProjectRepo.update({ id }, { name });

    await this.publisher.send("project.updated", updatedProject);
  }
}
