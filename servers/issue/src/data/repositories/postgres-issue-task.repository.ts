import { TypeormStore, QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { IssueTaskEntity } from "../entities";
import { IssueTaskRepository } from "./interfaces/issue-task.repository";

export class PostgresIssueTaskRepository implements IssueTaskRepository {
  constructor(private readonly postgresTypeormStore: TypeormStore) {}

  save = async (task: IssueTaskEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.postgresTypeormStore
      .createQueryBuilder(queryRunner)
      .insert()
      .into(IssueTaskEntity)
      .values(task)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as IssueTaskEntity;
  };

  existsById = (id: string) => {
    throw new Error("Method not implemented.");
  };

  find = async (issueId: string) => {
    const result = await this.postgresTypeormStore.query(
      "SELECT * FROM find_issue_tasks_by_issue_id($1)",
      [issueId],
    );

    console.log(result);

    return result as IssueTaskEntity[];
  };

  update = async (
    id: string,
    updatedTask: IssueTaskEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.postgresTypeormStore
      .createQueryBuilder(queryRunner)
      .update(IssueTaskEntity)
      .set(updatedTask)
      .where("id = :id", { id });

    await query.execute();
  };

  softDelete = (id: string, options?: QueryBuilderOptions) => {
    throw new Error("Method not implemented.");
  };
}
