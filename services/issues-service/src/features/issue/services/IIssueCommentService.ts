import { ServiceResponse } from "@pine/common";
import type { IssueComment } from "@/db";

export interface IIssueCommentService {
  createIssueComment(userId: string, issueId: string, description: string): Promise<void>;
  getIssueCommentList(issueId: string): Promise<ServiceResponse<IssueComment[]>>;
  deleteIssueComment(issueId: string): Promise<void>;
}
