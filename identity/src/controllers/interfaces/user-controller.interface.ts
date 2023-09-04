import { FastifyReply, FastifyRequest } from "fastify";
import { JwtPayload } from "jsonwebtoken";

export interface UserController {
  create(req: FastifyRequest, res: FastifyReply): Promise<void>;
  login(req: FastifyRequest, res: FastifyReply): Promise<void>;
  getCurrentUser(req: FastifyRequest, res: FastifyReply): JwtPayload | null;
  refresh(req: FastifyRequest, res: FastifyReply): Promise<void>;
  updateEmail(req: FastifyRequest, res: FastifyReply): Promise<Response>;
  // updatePassword(req: FastifyRequest, res: FastifyReply): Promise<Response>;
  // delete(): void;
  // list(): void;
}
