import {
  Issue,
  IssueFormData,
  IssueListFilters,
  IssuePriority,
  ServiceResponse,
} from "@sourabhrawatcc/core-utils";
import { IssueEntity } from "../../app/entities";
import { ObjectLiteral } from "typeorm";
import { IssueStatus } from "@issue-tracker/common";

export interface IssueService {
  createIssue(userId: string, issue: IssueFormData): Promise<string>;
  getIssue(issueId: string): Promise<IssueEntity>;
  getIssueList(
    userId: string,
    filters: IssueListFilters,
  ): Promise<ServiceResponse<ObjectLiteral[]>>;
  getIssueStatusList(): Promise<ServiceResponse<IssueStatus[]>>;
  getIssuePriorityList(): Promise<ServiceResponse<IssuePriority[]>>;
  updateIssue(
    userId: string,
    id: string,
    issueFormData: IssueFormData,
  ): Promise<void>;
  updateIssueStatus(
    userId: string,
    id: string,
    status: IssueStatus,
  ): Promise<void>;
  updateIssueResolution(
    userId: string,
    id: string,
    resolution: boolean,
  ): Promise<void>;
}
