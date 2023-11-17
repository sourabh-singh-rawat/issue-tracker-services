import { FastifyReply, FastifyRequest } from "fastify";

export interface IssueAttachmentController {
  createIssueAttachment(req: FastifyRequest, rep: FastifyReply): Promise<void>;
  getIssueAttachmentList(req: FastifyRequest, rep: FastifyReply): Promise<void>;
}
