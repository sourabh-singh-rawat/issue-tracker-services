import { FastifyRequest, FastifyReply } from "fastify";
export interface WorkspaceController {
  createWorkspace(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  getAllWorkspaces(request: FastifyRequest, reply: FastifyReply): Promise<void>;
}
