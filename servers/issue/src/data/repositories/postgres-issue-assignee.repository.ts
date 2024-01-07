import { TypeormStore, QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { IssueAssigneeEntity } from "../entities";
import { IssueAssigneeRepository } from "./interfaces/issue-assignee.repository";

export class PostgresIssueAssigneeRepository
  implements IssueAssigneeRepository
{
  constructor(private postgresTypeormStore: TypeormStore) {}
  existsById(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  save = async (
    assignee: IssueAssigneeEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.postgresTypeormStore
      .createQueryBuilder(queryRunner)
      .insert()
      .into(IssueAssigneeEntity)
      .values(assignee)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as IssueAssigneeEntity;
  };

  findAssigneeByUserId = async (id: string) => {
    const result = await this.postgresTypeormStore.query<IssueAssigneeEntity>(
      "SELECT * FROM find_assignee_by_user_id($1)",
      [id],
    );

    return result[0];
  };

  findByIssueId = async (issueId: string) => {
    const result = await this.postgresTypeormStore.query<{
      id: string;
      name: string;
      userId: string;
    }>("SELECT * FROM find_assignees_by_issue_id($1)", [issueId]);

    return result;
  };

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    throw new Error("Method not implemented.");
  };
}
