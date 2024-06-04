import { IssueListFilters } from "@issue-tracker/common";
import { IssueEntity } from "../../entities";
import { QueryBuilderOptions, Repository } from "@issue-tracker/orm";

export interface IssueRepository extends Repository<IssueEntity> {
  find(userId: string, filters: IssueListFilters): Promise<IssueEntity[]>;
  findOne(id: string): Promise<IssueEntity | null>;
  isIssueArchived(id: string): Promise<boolean>;
  update(
    id: string,
    updatedIssue: IssueEntity,
    options?: QueryBuilderOptions,
  ): Promise<void>;
  updateResolution(
    id: string,
    updatedIssue: IssueEntity,
    options?: QueryBuilderOptions,
  ): Promise<void>;
  restoreDelete(id: string, options?: QueryBuilderOptions): Promise<void>;
}
