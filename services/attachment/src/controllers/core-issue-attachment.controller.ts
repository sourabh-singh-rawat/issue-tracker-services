import { StatusCodes } from "http-status-codes";
import { FastifyReply, FastifyRequest } from "fastify";
import { IssueAttachmentController } from "./interfaces/issue-attachment.controller";
import { AttachmentService } from "../services/interfaces/AttachmentService";

export class CoreIssueAttachmentController
  implements IssueAttachmentController
{
  constructor(private readonly issueAttachmentService: AttachmentService) {}

  createIssueAttachment = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    const { userId } = request.currentUser;
    const data = await request.file();

    if (!data) throw new Error("No data provided");

    await this.issueAttachmentService.createAttachment({
      itemId: id,
      userId,
      file: data,
    });

    return reply.status(StatusCodes.CREATED).send();
  };

  getIssueAttachmentList = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;

    const response = await this.issueAttachmentService.getAttachmentList(id);

    return reply.send(response);
  };
}
