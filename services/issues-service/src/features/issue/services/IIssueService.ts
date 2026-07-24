import { IssueStatus, ItemPriority, PagingOptions, ServiceResponse } from "@pine/common";
import { ServiceOptions } from "@pine/orm";
import { Issue } from "@/entities/Issue";

export interface CreateIssueOptions extends ServiceOptions {
  userId: string;
  projectId: string;
  type: string;
  name: string;
  assigneeIds: string[];
  description?: string;
  dueDate?: Date;
  statusId?: string;
  priority?: ItemPriority;
  parentIssueId?: string;
  estimate?: number;
  component?: string;
}

export interface FindIssueOptions {
  userId: string;
  issueId: string;
}

export interface FindSubIssuesOptions extends PagingOptions {
  userId: string;
  parentIssueId: string;
}

export interface UpdateIssueOptions extends ServiceOptions {
  userId: string;
  issueId: string;
  type?: string;
  name?: string;
  statusId?: string;
  priority?: ItemPriority;
  assigneeIds?: string[];
  description?: string;
  dueDate?: Date;
  estimate?: number;
  component?: string;
}

export interface FindProjectIssuesOptions {
  projectId: string;
  userId: string;
}

export interface DeleteIssueOptions extends ServiceOptions {
  id: string;
}

export interface IIssueService {
  createIssue(options: CreateIssueOptions): Promise<string>;
  findIssue(options: FindIssueOptions): Promise<Issue | null>;
  findProjectIssues(options: FindProjectIssuesOptions): Promise<Issue[]>;
  findSubIssues(options: FindSubIssuesOptions): Promise<Issue[]>;
  getIssue(issueId: string): Promise<Issue | null>;
  getIssueStatusList(): Promise<ServiceResponse<IssueStatus[]>>;
  getIssuePriorityList(): Promise<ServiceResponse<ItemPriority[]>>;
  updateIssue(options: UpdateIssueOptions): Promise<void>;
  deleteIssue(options: DeleteIssueOptions): Promise<void>;
}
