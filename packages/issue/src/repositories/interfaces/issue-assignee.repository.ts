import { Repository } from "@sourabhrawatcc/core-utils";
import { IssueAssigneeEntity } from "../../app/entities";

export interface IssueAssigneeRepository
  extends Repository<IssueAssigneeEntity> {
  findByIssueId(issueId: string): Promise<IssueAssigneeEntity[]>;
  findAssigneeByUserId(id: string): Promise<IssueAssigneeEntity | null>;
}
