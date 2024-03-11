import {
  IssueListFilters,
  IssueFormData,
  QueryBuilderOptions,
  Repository,
} from "@sourabhrawatcc/core-utils";
import { IssueEntity } from "../../app/entities";
import { ObjectLiteral } from "typeorm";

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
