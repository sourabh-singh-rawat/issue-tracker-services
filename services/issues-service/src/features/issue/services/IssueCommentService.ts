import { ServiceResponse } from "@pine/common";
import { IssueComment } from "@/entities/IssueComment";
import { IIssueCommentService } from "./IIssueCommentService";

export class IssueCommentService implements IIssueCommentService {
  constructor() {}

  createIssueComment = async (userId: string, issueId: string, description: string) => {
    const newIssueComment = new IssueComment();
    newIssueComment.userId = userId;
    newIssueComment.issueId = issueId;
    newIssueComment.description = description;
  };

  getIssueCommentList = async (issueId: string) => {
    return new ServiceResponse({ rows: [], filteredRowCount: 1 });
  };

  deleteIssueComment = async (commentId: string) => {};
}
