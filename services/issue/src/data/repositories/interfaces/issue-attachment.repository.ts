import { Repository } from "@issue-tracker/orm";
import { IssueAttachmentEntity } from "../../entities";

export interface IssueAttachmentRepository
  extends Repository<IssueAttachmentEntity> {}
