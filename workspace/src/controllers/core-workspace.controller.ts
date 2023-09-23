import { FastifyReply, FastifyRequest } from "fastify";
import { WorkspaceController } from "./interfaces/workspace-controller";
import { Services } from "../app/container.config";

export class CoreWorkspaceController implements WorkspaceController {
  private readonly _container;
  private readonly _workspaceService;

  constructor(container: Services) {
    this._container = container;
    this._workspaceService = container.workspaceService;
  }

  createWorkspace = async (
    request: FastifyRequest<{ Body: { name: string; description?: string } }>,
    reply: FastifyReply,
  ): Promise<void> => {
    const { id } = request.currentUser;
    const { name, description } = request.body;

    const workspace = await this._workspaceService.createWorkspace(id, {
      name,
      description,
    });

    return reply.send(workspace);
  };

  getAllWorkspaces = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.currentUser;

    const response = await this._workspaceService.getAllWorkspaces(id);
    return reply.send(response);
  };
}
