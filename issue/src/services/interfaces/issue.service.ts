import {
  IssueRegistrationData,
  ServiceResponse,
} from "@sourabhrawatcc/core-utils";
import { IssueEntity } from "../../data/entities";

export interface IssueService {
  createIssue(
    userId: string,
    issue: IssueRegistrationData,
  ): Promise<ServiceResponse<string>>;
}
