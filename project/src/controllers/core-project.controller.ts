import { FastifyReply, FastifyRequest } from "fastify";
import { ProjectController } from "./interfaces/project.controller";
import { RegisteredServices } from "../app/service-container";
import { ProjectRegistrationData } from "@sourabhrawatcc/core-utils";

export class CoreProjectController implements ProjectController {
  private readonly projectService;

  constructor(serviceContainer: RegisteredServices) {
    this.projectService = serviceContainer.projectService;
  }

  createProject = async (
    request: FastifyRequest<{ Body: ProjectRegistrationData }>,
    reply: FastifyReply,
  ) => {
    const { userId, workspaceId } = request.currentUser;
    const project = request.body;

    await this.projectService.createProject(userId, workspaceId, project);
  };

  getProjectStatuses = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ) => {};
}
