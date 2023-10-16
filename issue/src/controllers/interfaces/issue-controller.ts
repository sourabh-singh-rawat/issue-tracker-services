import { FastifyRequest, FastifyReply } from "fastify";
export interface IssueController {
  createIssue(request: FastifyRequest, reply: FastifyReply): Promise<void>;
}
