import { TypeormStore, QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { IssueCommentEntity } from "../app/entities";
import { IssueCommentRepository } from "./interfaces/issue-comment.repository";

export class PostgresIssueCommentRepository implements IssueCommentRepository {
  constructor(private store: TypeormStore) {}

  save = async (comment: IssueCommentEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.store
      .createQueryBuilder(queryRunner)
      .insert()
      .into(IssueCommentEntity)
      .values(comment)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as IssueCommentEntity;
  };

  existsById = async (id: string) => {
    return await IssueCommentEntity.exists({ where: { id } });
  };

  findByIssueId = async (issueId: string) => {
    return await IssueCommentEntity.find({ where: { issueId } });
  };

  findCountByIssueId = async (issueId: string) => {
    return await IssueCommentEntity.count({ where: { issueId } });
  };

  delete = async (id: string) => {
    await this.store
      .createQueryBuilder()
      .delete()
      .from(IssueCommentEntity)
      .where("id = :id", { id })
      .execute();
  };

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    throw new Error("Method not implemented.");
  };
}
