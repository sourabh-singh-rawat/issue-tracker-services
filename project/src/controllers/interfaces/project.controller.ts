import { FastifyReply, FastifyRequest } from "fastify";

export interface ProjectController {
  createProject(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  getProjectStatusList(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void>;
  getProjectList(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  getProject(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  updateProject(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  // deleteProject(request: FastifyRequest, reply: FastifyReply): Promise<void>;
}
