import { FastifyReply, FastifyRequest } from "fastify";

export interface IssueCommentController {
  createIssueComment(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void>;

  getIssueCommentList(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void>;

  deleteIssueComment(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void>;
}
