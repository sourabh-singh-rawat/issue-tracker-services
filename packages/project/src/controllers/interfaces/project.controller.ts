import { FastifyReply, FastifyRequest } from "fastify";

export interface ProjectController {
  createProject(req: FastifyRequest, rep: FastifyReply): Promise<void>;
  createProjectInvite(req: FastifyRequest, rep: FastifyReply): Promise<void>;
  confirmProjectInvite(req: FastifyRequest, rep: FastifyReply): Promise<void>;
  // createProjectMember(req: FastifyRequest, rep: FastifyReply): Promise<void>;
  getProjectStatusList(req: FastifyRequest, rep: FastifyReply): Promise<void>;
  getProjectList(req: FastifyRequest, rep: FastifyReply): Promise<void>;
  getProjectRoleList(req: FastifyRequest, rep: FastifyReply): Promise<void>;
  getProject(req: FastifyRequest, rep: FastifyReply): Promise<void>;
  getWorkspaceMemberList(req: FastifyRequest, rep: FastifyReply): Promise<void>;
  getProjectMembers(req: FastifyRequest, rep: FastifyReply): Promise<void>;
  updateProject(req: FastifyRequest, rep: FastifyReply): Promise<void>;
  // deleteProject(req: FastifyRequest, rep: FastifyReply): Promise<void>;
}
