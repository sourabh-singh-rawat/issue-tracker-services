import { IssueCommentEntity } from "../data/entities";
import { IssueCommentService } from "./interfaces/issue-comment.service";
import { IssueCommentRepository } from "../data/repositories/interfaces/issue-comment.repository";
import { ServiceResponse } from "@issue-tracker/common";

export class CoreIssueCommentService implements IssueCommentService {
  constructor(private issueCommentRepository: IssueCommentRepository) {}

  createIssueComment = async (
    userId: string,
    issueId: string,
    description: string,
  ) => {
    const newIssueComment = new IssueCommentEntity();
    newIssueComment.userId = userId;
    newIssueComment.issueId = issueId;
    newIssueComment.description = description;

    await this.issueCommentRepository.save(newIssueComment);
  };

  getIssueCommentList = async (issueId: string) => {
    const rows = await this.issueCommentRepository.findByIssueId(issueId);

    return new ServiceResponse({ rows, filteredRowCount: rows.length });
  };

  deleteIssueComment = async (commentId: string) => {
    await this.issueCommentRepository.delete(commentId);
  };
}
