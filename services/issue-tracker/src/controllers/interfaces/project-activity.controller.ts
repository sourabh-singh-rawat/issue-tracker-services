import { FastifyReply, FastifyRequest } from "fastify";

export interface ProjectActivityController {
  getProjectActivityList(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void>;
}
