import {
  TypeormStore,
  IssueListFilters,
  IssueFormData,
  QueryBuilderOptions,
} from "@sourabhrawatcc/core-utils";
import { IssueEntity } from "../entities";
import { IssueRepository } from "./interfaces/issue.repository";

export class PostgresIssueRepository implements IssueRepository {
  constructor(private postgresTypeormStore: TypeormStore) {}

  save = async (issue: IssueEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.postgresTypeormStore
      .createQueryBuilder(queryRunner)
      .insert()
      .into(IssueEntity)
      .values(issue)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as IssueEntity;
  };

  existsById = async (id: string) => {
    throw new Error("Method not implemented.");
  };

  find = async (userId: string, filters: IssueListFilters) => {
    const {
      page = 0,
      pageSize = 10,
      sortBy = "updatedAt",
      sortOrder = "ASC",
      projectId,
    } = filters;
    const result = await this.postgresTypeormStore.query<IssueFormData>(
      "SELECT * FROM find_issues_by_user_id_and_project_id($1, $2, $3, $4, $5, $6)",
      [userId, projectId, sortBy, sortOrder, pageSize, page * pageSize],
    );

    return result;
  };

  findOne = async (id: string) => {
    const result = await this.postgresTypeormStore.query<IssueFormData>(
      "SELECT * FROM find_issue_by_id($1)",
      [id],
    );

    return result[0];
  };

  isIssueArchived = async (id: string) => {
    const result = await this.postgresTypeormStore.query<{
      isArchived: boolean;
    }>("SELECT * FROM is_archived($1)", [id]);

    return result[0].isArchived;
  };

  update = async (
    id: string,
    updatedIssue: IssueEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.postgresTypeormStore
      .createQueryBuilder(queryRunner)
      .update(IssueEntity)
      .set(updatedIssue)
      .where("id = :id AND deletedAt IS NULL", { id });

    await query.execute();
  };

  updateResolution = async (
    id: string,
    updatedIssue: IssueEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.postgresTypeormStore
      .createQueryBuilder(queryRunner)
      .update(IssueEntity)
      .set(updatedIssue)
      .where("id = :id", { id });

    await query.execute();
  };

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.postgresTypeormStore
      .createQueryBuilder(queryRunner)
      .softDelete()
      .from(IssueEntity)
      .where("id = :id", { id });

    await query.execute();
  };

  restoreDelete = async (id: string, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.postgresTypeormStore
      .createQueryBuilder(queryRunner)
      .restore()
      .from(IssueEntity)
      .where("id = :id", { id });

    await query.execute();
  };
}
