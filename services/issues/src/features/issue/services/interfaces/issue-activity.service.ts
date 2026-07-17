import { IssueCreatedPayload } from "@pine/event-bus";

export interface IssueActivityService {
  logCreatedIssue(payload: IssueCreatedPayload): Promise<void>;
}
