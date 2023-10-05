import { FastifyRequest, FastifyReply } from "fastify";

export interface UserController {
  registerUser(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  verifyPassword(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  setDefaultWorkspace(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void>;
  getCurrentUser(request: FastifyRequest, reply: FastifyReply): Promise<void>;
}
