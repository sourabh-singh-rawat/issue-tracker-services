import { FastifyReply, FastifyRequest } from "fastify";

export interface IdentityController {
  generateTokens(req: FastifyRequest, res: FastifyReply): Promise<void>;
  refreshTokens(req: FastifyRequest, res: FastifyReply): Promise<void>;
  revokeTokens(req: FastifyRequest, res: FastifyReply): Promise<void>;
}
