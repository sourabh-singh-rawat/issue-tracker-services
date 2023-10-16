import { FastifyReply, FastifyRequest } from "fastify";
import { IssueController } from "./interfaces/issue-controller";
import { IssueService } from "../services/interfaces/issue.service";
import { IssueRegistrationData } from "@sourabhrawatcc/core-utils";
import { HttpStatusCode } from "axios";

export class CoreIssueController implements IssueController {
  constructor(private issueService: IssueService) {}

  createIssue = async (
    request: FastifyRequest<{ Body: IssueRegistrationData }>,
    reply: FastifyReply,
  ) => {
    const { userId } = request.currentUser;
    const {
      name,
      description,
      priority,
      status,
      reporterId,
      dueDate,
      projectId,
      resolution,
      assignees,
    } = request.body;

    const workspace = await this.issueService.createIssue(userId, {
      name,
      description,
      priority,
      status,
      reporterId,
      dueDate,
      projectId,
      resolution,
      assignees,
    });

    return reply.status(HttpStatusCode.Created).send(workspace);
  };
}
