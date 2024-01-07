import { Repository } from "@sourabhrawatcc/core-utils";
import { IssueAssigneeEntity } from "../../entities";

export interface IssueAssigneeRepository
  extends Repository<IssueAssigneeEntity> {
  findByIssueId(issueId: string): Promise<
    {
      id: string;
      name: string;
      userId: string;
    }[]
  >;
  findAssigneeByUserId(id: string): Promise<IssueAssigneeEntity | null>;
}
