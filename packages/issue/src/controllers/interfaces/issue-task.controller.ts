import { FastifyReply, FastifyRequest } from "fastify";

export interface IssueTaskController {
  createIssueTask(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  getIssueTask(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  getTaskList(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  getIssueTaskList(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  updateIssueTask(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  deleteIssueTask(request: FastifyRequest, reply: FastifyReply): Promise<void>;
}
