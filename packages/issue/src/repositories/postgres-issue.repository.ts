import {
  TypeormStore,
  IssueListFilters,
  IssueFormData,
  QueryBuilderOptions,
} from "@sourabhrawatcc/core-utils";
import { IssueEntity } from "../app/entities";
import { IssueRepository } from "./interfaces/issue.repository";

export class PostgresIssueRepository implements IssueRepository {
  constructor(private store: TypeormStore) {}

  save = async (issue: IssueEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.store
      .createQueryBuilder(queryRunner)
      .insert()
      .into(IssueEntity)
      .values(issue)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as IssueEntity;
  };

  existsById = async (id: string) => {
    return await IssueEntity.exists({ where: { id } });
  };

  find = async (userId: string, filters: IssueListFilters) => {
    const {
      page = 0,
      pageSize = 10,
      sortBy = "updatedAt",
      sortOrder = "ASC",
      projectId,
    } = filters;

    return await IssueEntity.find({ where: { createdById: userId } });
  };

  findOne = async (id: string) => {
    return await IssueEntity.findOne({ where: { id } });
  };

  isIssueArchived = async (id: string) => {
    const result = await this.store.query<{
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
    const query = this.store
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
    const query = this.store
      .createQueryBuilder(queryRunner)
      .update(IssueEntity)
      .set(updatedIssue)
      .where("id = :id", { id });

    await query.execute();
  };

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.store
      .createQueryBuilder(queryRunner)
      .softDelete()
      .from(IssueEntity)
      .where("id = :id", { id });

    await query.execute();
  };

  restoreDelete = async (id: string, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.store
      .createQueryBuilder(queryRunner)
      .restore()
      .from(IssueEntity)
      .where("id = :id", { id });

    await query.execute();
  };
}
