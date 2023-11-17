import { Repository } from "@sourabhrawatcc/core-utils";
import { IssueAttachmentEntity } from "../../entities";

export interface IssueAttachmentRepository
  extends Repository<IssueAttachmentEntity> {
  find(id: string): Promise<IssueAttachmentEntity[]>;
}
