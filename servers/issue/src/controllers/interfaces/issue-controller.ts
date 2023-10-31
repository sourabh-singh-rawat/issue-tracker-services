import { FastifyRequest, FastifyReply } from "fastify";
export interface IssueController {
  createIssue(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  getIssue(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  getIssueList(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  getIssueStatusList(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void>;
  getIssuePriorityList(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void>;
  updateIssue(request: FastifyRequest, reply: FastifyReply): Promise<void>;
}
