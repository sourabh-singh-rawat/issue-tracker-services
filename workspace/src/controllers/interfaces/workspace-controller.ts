import { FastifyRequest, FastifyReply } from "fastify";
export interface WorkspaceController {
  createWorkspace(req: FastifyRequest, res: FastifyReply): Promise<void>;
  createWorkspaceInvite(req: FastifyRequest, res: FastifyReply): Promise<void>;
  getAllWorkspaces(req: FastifyRequest, res: FastifyReply): Promise<void>;
  getWorkspace(req: FastifyRequest, res: FastifyReply): Promise<void>;
  getWorkspaceRoleList(req: FastifyRequest, res: FastifyReply): Promise<void>;
  confirmWorkspaceInvite(req: FastifyRequest, res: FastifyReply): Promise<void>;
}
