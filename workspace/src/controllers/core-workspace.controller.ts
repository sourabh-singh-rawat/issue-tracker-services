import { FastifyReply, FastifyRequest } from "fastify";
import { WorkspaceController } from "./interfaces/workspace-controller";
import { RegisteredServices } from "../app/service-container";

export class CoreWorkspaceController implements WorkspaceController {
  private readonly workspaceService;

  constructor(serviceContainer: RegisteredServices) {
    this.workspaceService = serviceContainer.workspaceService;
  }

  createWorkspace = async (
    request: FastifyRequest<{ Body: { name: string; description?: string } }>,
    reply: FastifyReply,
  ) => {
    const { userId } = request.currentUser;
    const { name, description } = request.body;

    const workspace = await this.workspaceService.createWorkspace(userId, {
      name,
      description,
    });

    return reply.send(workspace);
  };

  getAllWorkspaces = async (request: FastifyRequest, reply: FastifyReply) => {
    const { userId } = request.currentUser;

    const response = await this.workspaceService.getAllWorkspaces(userId);
    return reply.send(response);
  };

  getWorkspace = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) => {
    const { userId } = request.currentUser;
    const { id } = request.params;

    const response = await this.workspaceService.getWorkspace(id);
    return reply.send(response);
  };
}
