import {
  DatabaseService,
  QueryBuilderOptions,
} from "@sourabhrawatcc/core-utils";
import { IssueAssigneeEntity } from "../entities";
import { IssueAssigneeRepository } from "./interfaces/issue-assignee.repository";

export class PostgresIssueAssigneeRepository
  implements IssueAssigneeRepository
{
  constructor(private databaseService: DatabaseService) {}

  save = async (
    assignee: IssueAssigneeEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.databaseService
      .createQueryBuilder(IssueAssigneeEntity, "u", queryRunner)
      .insert()
      .into(IssueAssigneeEntity)
      .values(assignee)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as IssueAssigneeEntity;
  };

  existsById = async (id: string) => {
    throw new Error("Method not implemented.");
  };

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    throw new Error("Method not implemented.");
  };
}
