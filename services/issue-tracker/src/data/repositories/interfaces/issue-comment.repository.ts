import { Repository } from "@issue-tracker/orm";
import { IssueCommentEntity } from "../../entities";

export interface IssueCommentRepository extends Repository<IssueCommentEntity> {
  findByIssueId(issueId: string): Promise<IssueCommentEntity[]>;
  findCountByIssueId(issueId: string): Promise<number>;
  delete(id: string): Promise<void>;
}
