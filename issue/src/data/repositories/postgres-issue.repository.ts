import {
  DatabaseService,
  QueryBuilderOptions,
} from "@sourabhrawatcc/core-utils";
import { IssueEntity } from "../entities";
import { IssueRepository } from "./interfaces/issue.repository";

export class PostgresIssueRepository implements IssueRepository {
  constructor(private databaseService: DatabaseService) {}

  save = async (issue: IssueEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.databaseService
      .createQueryBuilder(IssueEntity, "u", queryRunner)
      .insert()
      .into(IssueEntity)
      .values(issue)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as IssueEntity;
  };

  existsById = async (id: string) => {
    throw new Error("Method not implemented.");
  };

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    throw new Error("Method not implemented.");
  };
}
