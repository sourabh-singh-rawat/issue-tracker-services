import { Repository } from "@sourabhrawatcc/core-utils";
import { IssueCommentEntity } from "../../app/entities";

export interface IssueCommentRepository extends Repository<IssueCommentEntity> {
  findByIssueId(issueId: string): Promise<IssueCommentEntity[]>;
  findCountByIssueId(issueId: string): Promise<number>;
  delete(id: string): Promise<void>;
}
