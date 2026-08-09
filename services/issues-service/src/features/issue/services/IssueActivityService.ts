import { IssueCreatedData } from "@pine/events";
import { IIssueActivityService } from "./IIssueActivityService";

export class IssueActivityService implements IIssueActivityService {
  constructor() {}

  logCreatedIssue = async (_payload: IssueCreatedData) => {};
}
