import { ListItem } from "../../data/entities";
import { ObjectLiteral } from "typeorm";
import {
  IssueFormData,
  IssueListFilters,
  IssuePriority,
  ServiceResponse,
} from "@issue-tracker/common";
import { IssueStatus } from "@issue-tracker/common/dist/constants/enums/issue-status";

export interface IssueService {
  createIssue(userId: string, issue: IssueFormData): Promise<string>;
  getIssue(issueId: string): Promise<ListItem>;
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
