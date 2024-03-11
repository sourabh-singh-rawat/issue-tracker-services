import { QueryBuilderOptions, Repository } from "@sourabhrawatcc/core-utils";
import { IssueTaskEntity } from "../../app/entities";

export interface IssueTaskRepository extends Repository<IssueTaskEntity> {
  find(issueId: string): Promise<IssueTaskEntity[]>;
  update(
    id: string,
    updatedTask: IssueTaskEntity,
    options?: QueryBuilderOptions,
  ): Promise<void>;
}
