import { FastifyReply, FastifyRequest } from "fastify";

export interface UserController {
  create(request: FastifyRequest, reply: FastifyReply): Promise<Response>;
  // get(): void;
  update(request: FastifyRequest, reply: FastifyReply): Promise<Response>;
  // delete(): void;
  // list(): void;
}
