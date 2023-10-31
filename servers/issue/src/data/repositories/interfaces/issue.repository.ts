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
  findOne(issueId: string): Promise<IssueEntity | null>;
  update(
    id: string,
    updatedProject: IssueEntity,
    options?: QueryBuilderOptions,
  ): Promise<void>;
}
