import { IssueListFilters } from "@issue-tracker/common";
import { Item } from "../../entities";
import { QueryBuilderOptions, Repository } from "@issue-tracker/orm";

export interface IssueRepository extends Repository<Item> {
  find(userId: string, filters: IssueListFilters): Promise<Item[]>;
  findOne(id: string): Promise<Item | null>;
  isIssueArchived(id: string): Promise<boolean>;
  update(
    id: string,
    updatedIssue: Item,
    options?: QueryBuilderOptions,
  ): Promise<void>;
  updateResolution(
    id: string,
    updatedIssue: Item,
    options?: QueryBuilderOptions,
  ): Promise<void>;
  restoreDelete(id: string, options?: QueryBuilderOptions): Promise<void>;
}
