import {
  Issue,
  IssueFormData,
  IssueListFilters,
  IssuePriority,
  IssueStatus,
  ServiceResponse,
} from "@sourabhrawatcc/core-utils";
import { IssueEntity } from "../../data/entities";
import { ObjectLiteral } from "typeorm";

export interface IssueService {
  createIssue(
    userId: string,
    issue: IssueFormData,
  ): Promise<ServiceResponse<string>>;
  getIssue(issueId: string): Promise<ServiceResponse<IssueEntity>>;
  getIssueList(
    userId: string,
    filters: IssueListFilters,
  ): Promise<ServiceResponse<ObjectLiteral[]>>;
  getIssueStatusList(): Promise<ServiceResponse<IssueStatus[]>>;
  getIssuePriorityList(): Promise<ServiceResponse<IssuePriority[]>>;
  updateIssue(id: string, issueFormData: IssueFormData): Promise<void>;
}
