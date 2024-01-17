import {
  IssueListFilters,
  IssueFormData,
  QueryBuilderOptions,
  Repository,
} from "@sourabhrawatcc/core-utils";
import { IssueEntity } from "../../entities";
import { ObjectLiteral } from "typeorm";

export interface IssueRepository extends Repository<IssueEntity> {
  find(userId: string, filters: IssueListFilters): Promise<IssueFormData[]>;
  findOne(id: string): Promise<IssueFormData | null>;
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
