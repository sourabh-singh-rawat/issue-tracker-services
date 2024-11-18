import { IssueListFilters } from "@issue-tracker/common";
import { ListItem } from "../../entities";
import { QueryBuilderOptions, Repository } from "@issue-tracker/orm";

export interface IssueRepository extends Repository<ListItem> {
  find(userId: string, filters: IssueListFilters): Promise<ListItem[]>;
  findOne(id: string): Promise<ListItem | null>;
  isIssueArchived(id: string): Promise<boolean>;
  update(
    id: string,
    updatedIssue: ListItem,
    options?: QueryBuilderOptions,
  ): Promise<void>;
  updateResolution(
    id: string,
    updatedIssue: ListItem,
    options?: QueryBuilderOptions,
  ): Promise<void>;
  restoreDelete(id: string, options?: QueryBuilderOptions): Promise<void>;
}
