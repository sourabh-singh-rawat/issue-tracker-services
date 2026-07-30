import { STATUS_TYPE, UserNotFoundError } from "@pine/common";
import {
  createCloudEvent,
  ProjectCreatedEvent,
  ProjectUpdatedEvent,
} from "@pine/events";
import type { IOutboxService } from "@pine/outbox";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { Database, Project } from "@/db";
import type { IProjectRepository } from "@/features/project/repositories";
import type { IStatusService } from "@/features/status/services/IStatusService";
import type { IUserRepository } from "@/features/user/repositories";
import type {
  CreateProjectOptions,
  FindProjectOptions,
  FindProjectsOptions,
  IProjectService,
  UpdateProjectOptions,
} from "./IProjectService";

@injectable()
export class ProjectService implements IProjectService {
  constructor(
    @inject(TYPES.Database)
    private readonly db: Database,
    @inject(TYPES.ProjectRepository)
    private readonly projectRepository: IProjectRepository,
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepository,
    @inject(TYPES.StatusService)
    private readonly statusService: IStatusService,
    @inject(TYPES.OutboxService)
    private readonly outboxService: IOutboxService,
  ) {}

  private toProjectEventData(project: Project) {
    return {
      id: project.id,
      name: project.name,
      status: "active",
      ownerUserId: project.createdById,
      createdAt: project.createdAt.toISOString(),
      ...(project.updatedAt != null ? { updatedAt: project.updatedAt.toISOString() } : {}),
    };
  }

  async createProject(options: CreateProjectOptions) {
    const { name, userId } = options;

    return this.db.transaction(async (tx) => {
      const user = await this.userRepository.findById(userId, { tx });
      if (!user) throw new UserNotFoundError();

      const savedProject = await this.projectRepository.save(
        {
          name,
          createdById: userId,
        },
        { tx },
      );

      await this.statusService.createOptions({
        projectId: savedProject.id,
        statuses: [
          { name: "To Do", type: STATUS_TYPE.NOT_STARTED, orderIndex: 0 },
          { name: "In Progress", type: STATUS_TYPE.ACTIVE, orderIndex: 1 },
          { name: "Done", type: STATUS_TYPE.COMPLETED, orderIndex: 2 },
          { name: "Cancelled", type: STATUS_TYPE.CLOSED, orderIndex: 3 },
        ],
        tx,
      });

      const event = createCloudEvent({
        type: ProjectCreatedEvent.type,
        version: ProjectCreatedEvent.version,
        schema: ProjectCreatedEvent.schema,
        source: "pine/issues-service",
        subject: savedProject.id,
        data: this.toProjectEventData(savedProject),
      });

      await this.outboxService.schedule(
        {
          eventId: event.id,
          eventType: event.type,
          eventVersion: ProjectCreatedEvent.version,
          aggregateType: "project",
          aggregateId: savedProject.id,
          payload: event,
        },
        { tx },
      );

      return savedProject.id;
    });
  }

  async findProjects(options: FindProjectsOptions) {
    const { page, pageSize, userId } = options;
    return this.projectRepository.findByCreatedById(userId, page, pageSize);
  }

  async findProject(options: FindProjectOptions) {
    const { id, userId } = options;
    const project = await this.projectRepository.findByIdForUser(id, userId);
    if (!project) {
      throw new Error("Project not found");
    }
    return project;
  }

  async updateProject(options: UpdateProjectOptions) {
    const { id, name } = options;

    await this.db.transaction(async (tx) => {
      const updatedProject = await this.projectRepository.update(id, { name }, { tx });

      const event = createCloudEvent({
        type: ProjectUpdatedEvent.type,
        version: ProjectUpdatedEvent.version,
        schema: ProjectUpdatedEvent.schema,
        source: "pine/issues-service",
        subject: updatedProject.id,
        data: this.toProjectEventData(updatedProject),
      });

      await this.outboxService.schedule(
        {
          eventId: event.id,
          eventType: event.type,
          eventVersion: ProjectUpdatedEvent.version,
          aggregateType: "project",
          aggregateId: updatedProject.id,
          payload: event,
        },
        { tx },
      );
    });
  }
}
