import { TypeormStore, QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { IssueTaskEntity } from "../app/entities";
import { IssueTaskRepository } from "./interfaces/issue-task.repository";

export class PostgresIssueTaskRepository implements IssueTaskRepository {
  constructor(private readonly store: TypeormStore) {}

  save = async (task: IssueTaskEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.store
      .createQueryBuilder(queryRunner)
      .insert()
      .into(IssueTaskEntity)
      .values(task)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as IssueTaskEntity;
  };

  existsById = async (id: string) => {
    return await IssueTaskEntity.exists({ where: { id } });
  };

  find = async (issueId: string) => {
    return await IssueTaskEntity.find({ where: { issueId } });
  };

  update = async (
    id: string,
    updatedTask: IssueTaskEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.store
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
