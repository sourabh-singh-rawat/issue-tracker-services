import { Repository } from "@issue-tracker/orm";
import { IssueAssigneeEntity } from "../../entities";

export interface IssueAssigneeRepository
  extends Repository<IssueAssigneeEntity> {
  findByIssueId(issueId: string): Promise<IssueAssigneeEntity[]>;
  findAssigneeByUserId(id: string): Promise<IssueAssigneeEntity | null>;
}
