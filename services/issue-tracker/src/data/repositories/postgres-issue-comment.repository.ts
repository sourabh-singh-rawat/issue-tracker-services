import { Typeorm } from "@issue-tracker/orm";
import { IssueCommentEntity } from "../entities";
import { IssueCommentRepository } from "./interfaces/issue-comment.repository";
import { QueryBuilderOptions } from "@issue-tracker/orm";

export class PostgresIssueCommentRepository implements IssueCommentRepository {
  constructor(private orm: Typeorm) {}

  save = async (comment: IssueCommentEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
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
    await this.orm
      .createQueryBuilder()
      .delete()
      .from(IssueCommentEntity)
      .where("id = :id", { id })
      .execute();
  };

  softDelete = async () => {
    throw new Error("Method not implemented.");
  };
}
