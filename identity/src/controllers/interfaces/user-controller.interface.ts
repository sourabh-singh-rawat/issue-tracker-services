import { FastifyReply, FastifyRequest } from "fastify";

export interface UserController {
  create(req: FastifyRequest, res: FastifyReply): Promise<Response>;
  // get(): void;
  updateEmail(req: FastifyRequest, res: FastifyReply): Promise<Response>;
  updatePassword(req: FastifyRequest, res: FastifyReply): Promise<Response>;
  // delete(): void;
  // list(): void;
}
