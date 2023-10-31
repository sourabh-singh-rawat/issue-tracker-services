import {
  DatabaseService,
  QueryBuilderOptions,
} from "@sourabhrawatcc/core-utils";
import { IssueCommentEntity } from "../entities";
import { IssueCommentRepository } from "./interfaces/issue-comment.repository";

export class PostgresIssueCommentRepository implements IssueCommentRepository {
  constructor(private databaseService: DatabaseService) {}

  save = async (comment: IssueCommentEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.databaseService
      .createQueryBuilder(queryRunner)
      .insert()
      .into(IssueCommentEntity)
      .values(comment)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as IssueCommentEntity;
  };

  existsById = async (id: string) => {
    throw new Error("Method not implemented.");
  };

  findByIssueId = async (issueId: string) => {
    const result = await this.databaseService.query<IssueCommentEntity>(
      "SELECT * FROM find_comments_by_issue_id($1)",
      [issueId],
    );

    return result as IssueCommentEntity[];
  };

  findCountByIssueId = async (issueId: string) => {
    return await IssueCommentEntity.count({ where: { issueId } });
  };

  delete = async (id: string) => {
    await this.databaseService
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
