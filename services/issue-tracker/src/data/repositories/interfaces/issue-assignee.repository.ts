import { Repository } from "@issue-tracker/orm";
import { ItemAssignee } from "../../entities";

export interface IssueAssigneeRepository extends Repository<ItemAssignee> {
  findByIssueId(issueId: string): Promise<ItemAssignee[]>;
  findAssigneeByUserId(id: string): Promise<ItemAssignee | null>;
}
