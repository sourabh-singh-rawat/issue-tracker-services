import { FastifyRequest, FastifyReply } from "fastify";

export interface UserController {
  registerUser(req: FastifyRequest, rep: FastifyReply): Promise<void>;
  verifyPassword(req: FastifyRequest, rep: FastifyReply): Promise<void>;
  setDefaultWorkspace(req: FastifyRequest, rep: FastifyReply): Promise<void>;
  getCurrentUser(req: FastifyRequest, rep: FastifyReply): Promise<void>;
  verifyEmail(req: FastifyRequest, rep: FastifyReply): Promise<void>;
}
