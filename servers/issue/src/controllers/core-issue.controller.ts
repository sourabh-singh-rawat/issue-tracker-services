import { FastifyReply, FastifyRequest } from "fastify";
import { IssueController } from "./interfaces/issue-controller";
import { IssueService } from "../services/interfaces/issue.service";
import { IssueListFilters, IssueFormData } from "@sourabhrawatcc/core-utils";
import { StatusCodes } from "http-status-codes";

export class CoreIssueController implements IssueController {
  constructor(private issueService: IssueService) {}

  createIssue = async (
    request: FastifyRequest<{ Body: IssueFormData }>,
    reply: FastifyReply,
  ) => {
    const { userId } = request.currentUser;
    const issue = request.body;

    const response = await this.issueService.createIssue(userId, issue);

    return reply.status(StatusCodes.CREATED).send(response);
  };

  getIssueList = async (
    request: FastifyRequest<{ Querystring: IssueListFilters }>,
    reply: FastifyReply,
  ) => {
    const { userId } = request.currentUser;
    const filters = request.query;

    const response = await this.issueService.getIssueList(userId, filters);

    return reply.send(response);
  };

  getIssueStatusList = async (request: FastifyRequest, reply: FastifyReply) => {
    const response = await this.issueService.getIssueStatusList();

    return reply.send(response);
  };

  getIssuePriorityList = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ) => {
    const response = await this.issueService.getIssuePriorityList();

    return reply.send(response);
  };

  getIssue = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;

    const response = await this.issueService.getIssue(id);

    return reply.send(response);
  };

  updateIssue = async (
    request: FastifyRequest<{ Params: { id: string }; Body: IssueFormData }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    const issueFormData = request.body;

    await this.issueService.updateIssue(id, issueFormData);

    return reply.send();
  };
}
