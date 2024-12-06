import { FastifyReply, FastifyRequest } from "fastify";

export interface AttachmentController {
  createAttachment(req: FastifyRequest, rep: FastifyReply): Promise<void>;
  getIssueAttachmentList(req: FastifyRequest, rep: FastifyReply): Promise<void>;
}
