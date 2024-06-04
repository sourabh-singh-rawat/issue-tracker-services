import { MultipartFile } from "@fastify/multipart";
import { IssueAttachmentEntity } from "../../data/entities";
import { ServiceResponse } from "@issue-tracker/common";

export interface IssueAttachmentService {
  createIssueAttachment(
    id: string,
    userId: string,
    data: MultipartFile,
  ): Promise<void>;
  getIssueAttachmentList(
    id: string,
  ): Promise<ServiceResponse<IssueAttachmentEntity[]>>;
}
