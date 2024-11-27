import { FastifyReply, FastifyRequest } from "fastify";
import { IssueCommentController } from "./interfaces/issue-comment.controller";
import { IssueCommentService } from "../services/interfaces/issue-comment.service";
import { StatusCodes } from "http-status-codes";

export class CoreIssueCommentController implements IssueCommentController {
  constructor(private readonly issueCommentService: IssueCommentService) {}

  createIssueComment = async (
    request: FastifyRequest<{
      Params: { id: string };
      Body: { description: string };
    }>,
    reply: FastifyReply,
  ) => {
    const { userId } = request.user;
    const { id } = request.params;
    const { description } = request.body;

    await this.issueCommentService.createIssueComment(userId, id, description);

    return reply.status(StatusCodes.CREATED).send();
  };

  getIssueCommentList = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    const response = await this.issueCommentService.getIssueCommentList(id);

    return reply.send(response);
  };

  deleteIssueComment = async (
    request: FastifyRequest<{ Params: { id: string; commentId: string } }>,
    reply: FastifyReply,
  ) => {
    const { commentId } = request.params;
    await this.issueCommentService.deleteIssueComment(commentId);

    return reply.send();
  };
}
