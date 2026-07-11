import { ServiceResponse } from "@issue-tracker/common";
import { IssueCommentEntity } from "../../data";
import { IssueCommentService } from "./interfaces/issue-comment.service";

export class CoreIssueCommentService implements IssueCommentService {
  constructor() {}

  createIssueComment = async (
    userId: string,
    issueId: string,
    description: string,
  ) => {
    const newIssueComment = new IssueCommentEntity();
    newIssueComment.userId = userId;
    newIssueComment.issueId = issueId;
    newIssueComment.description = description;
  };

  getIssueCommentList = async (issueId: string) => {
    return new ServiceResponse({ rows: [], filteredRowCount: 1 });
  };

  deleteIssueComment = async (commentId: string) => {};
}
