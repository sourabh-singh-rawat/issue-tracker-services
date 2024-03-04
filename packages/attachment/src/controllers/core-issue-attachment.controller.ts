import { StatusCodes } from "http-status-codes";
import { FastifyReply, FastifyRequest } from "fastify";
import { IssueAttachmentController } from "./interfaces/issue-attachment.controller";
import { IssueAttachmentService } from "../services/interfaces/issue-attachment.service";

export class CoreIssueAttachmentController
  implements IssueAttachmentController
{
  constructor(
    private readonly issueAttachmentService: IssueAttachmentService,
  ) {}

  createIssueAttachment = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    const { userId } = request.currentUser;
    const data = await request.file();

    if (!data) throw new Error("No data provided");

    await this.issueAttachmentService.createIssueAttachment(id, userId, data);

    return reply.status(StatusCodes.CREATED).send();
  };

  getIssueAttachmentList = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;

    const response =
      await this.issueAttachmentService.getIssueAttachmentList(id);

    return reply.send(response);
  };
}
