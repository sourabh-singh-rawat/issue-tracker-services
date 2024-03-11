import { Repository } from "@sourabhrawatcc/core-utils";
import { IssueAttachmentEntity } from "../../app/entities";

export interface IssueAttachmentRepository
  extends Repository<IssueAttachmentEntity> {
  find(id: string): Promise<IssueAttachmentEntity[]>;
}
