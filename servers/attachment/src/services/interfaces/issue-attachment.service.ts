import { MultipartFile } from "@fastify/multipart";
import { IssueAttachmentEntity } from "../../data/entities";
import { ServiceResponse } from "@sourabhrawatcc/core-utils";

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
