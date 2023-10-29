import {
  DatabaseService,
  QueryBuilderOptions,
} from "@sourabhrawatcc/core-utils";
import { WorkspaceMemberEntity } from "../entities/workspace-member.entity";
import { WorkspaceMemberRepository } from "./interfaces/workspace-member.repository";

export class PostgresWorkspaceMemberRepository
  implements WorkspaceMemberRepository
{
  constructor(private readonly databaseService: DatabaseService) {}

  save = async (
    member: WorkspaceMemberEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.databaseService
      .createQueryBuilder(queryRunner)
      .insert()
      .into(WorkspaceMemberEntity)
      .values(member)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as WorkspaceMemberEntity;
  };

  existsById(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  softDelete(id: string, options?: QueryBuilderOptions): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
