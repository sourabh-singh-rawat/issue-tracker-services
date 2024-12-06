import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import { AttachmentService } from "../../app";
import { AttachmentController } from "./interfaces/AttachmentController";

export class CoreAttachmentController implements AttachmentController {
  constructor(private readonly attachmentService: AttachmentService) {}

  async createAttachment(
    request: FastifyRequest<{ Params: { itemId: string } }>,
    reply: FastifyReply,
  ) {
    const { itemId } = request.params;
    const userId = request.user.userId;
    const data = await request.file();

    if (!data) throw new Error("No data provided");

    await this.attachmentService.createAttachment({
      itemId,
      userId,
      filename: data.filename,
      mimetype: data.mimetype,
      file: await data.toBuffer(),
    });

    return reply.status(StatusCodes.CREATED).send();
  }

  getIssueAttachmentList = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;

    const response = await this.attachmentService.findAttachments(id);

    return reply.send(response);
  };
}
