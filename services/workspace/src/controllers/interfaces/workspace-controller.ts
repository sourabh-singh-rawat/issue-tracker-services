import { FastifyRequest, FastifyReply } from "fastify";
export interface WorkspaceController {
  createWorkspace(req: FastifyRequest, rep: FastifyReply): Promise<void>;
  createWorkspaceInvite(req: FastifyRequest, rep: FastifyReply): Promise<void>;
  getAllWorkspaces(req: FastifyRequest, rep: FastifyReply): Promise<void>;
  getWorkspace(req: FastifyRequest, rep: FastifyReply): Promise<void>;
  getWorkspaceRoleList(req: FastifyRequest, rep: FastifyReply): Promise<void>;
  confirmWorkspaceInvite(req: FastifyRequest, rep: FastifyReply): Promise<void>;
  getWorkspaceMemberList(req: FastifyRequest, rep: FastifyReply): Promise<void>;
}
