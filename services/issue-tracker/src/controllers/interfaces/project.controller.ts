import { FastifyReply, FastifyRequest } from "fastify";

export interface ProjectController {
  createProject(req: FastifyRequest, rep: FastifyReply): Promise<void>;
  // createProjectMember(req: FastifyRequest, rep: FastifyReply): Promise<void>;
  getProjectList(req: FastifyRequest, rep: FastifyReply): Promise<void>;
  getProject(req: FastifyRequest, rep: FastifyReply): Promise<void>;
  updateProject(req: FastifyRequest, rep: FastifyReply): Promise<void>;
  // deleteProject(req: FastifyRequest, rep: FastifyReply): Promise<void>;
}
