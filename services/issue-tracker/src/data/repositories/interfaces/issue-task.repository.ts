import { QueryBuilderOptions, Repository } from "@issue-tracker/orm";
import { CheckListItem } from "../../entities";

export interface IssueTaskRepository extends Repository<CheckListItem> {
  find(issueId: string): Promise<CheckListItem[]>;
  update(
    id: string,
    updatedTask: CheckListItem,
    options?: QueryBuilderOptions,
  ): Promise<void>;
}
