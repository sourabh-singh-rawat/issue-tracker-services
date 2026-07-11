import {
  CreateIssueInput,
  FindIssuesInput,
  Issue,
  UpdateIssueInput,
} from "../types";

export interface IssueResolver {
  createIssue(ctx: any, input: CreateIssueInput): Promise<string>;
  findIssue(ctx: any, id: string): Promise<Issue | null>;
  findProjectIssues(ctx: any, projectId: string): Promise<Issue[]>;
  findSubIssues(ctx: any, options: FindIssuesInput): Promise<Issue[]>;
  updateIssue(ctx: any, options: UpdateIssueInput): Promise<string>;
  deleteIssue(ctx: any, id: string): Promise<string>;
}
