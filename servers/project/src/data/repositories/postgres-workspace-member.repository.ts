import {
  DatabaseService,
  QueryBuilderOptions,
} from "@sourabhrawatcc/core-utils";
import { WorkspaceMemberEntity } from "../entities/workspace-member.entity";
import { WorkspaceMemberRepository } from "./interfaces/workspace-member.repository";
import { UserEntity } from "../entities";

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

  find = async (id: string) => {
    const result = await this.databaseService.query<UserEntity>(
      "SELECT * FROM find_members_by_workspace_id($1)",
      [id],
    );

    return result as UserEntity[];
  };

  softDelete(id: string, options?: QueryBuilderOptions): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
