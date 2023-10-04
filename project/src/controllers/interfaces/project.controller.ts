import { FastifyReply, FastifyRequest } from "fastify";

export interface ProjectController {
  createProject(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  // getAllProjects(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  // getProject(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  // updateProject(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  // deleteProject(request: FastifyRequest, reply: FastifyReply): Promise<void>;
}
