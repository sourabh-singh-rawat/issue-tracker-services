import { IssueCreatedPayload } from "@issue-tracker/event-bus";

export interface IssueActivityService {
  logCreatedIssue(payload: IssueCreatedPayload): Promise<void>;
}
