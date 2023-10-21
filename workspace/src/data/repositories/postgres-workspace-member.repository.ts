import {
  DatabaseService,
  QueryBuilderOptions,
} from "@sourabhrawatcc/core-utils";
import { WorkspaceMemberEntity } from "../entities/workspace-member.entity";
import { WorkspaceMemberRepository } from "./interface/workspace-member";

export class PostgresWorkspaceMemberRepository
  implements WorkspaceMemberRepository
{
  constructor(private databaseService: DatabaseService) {}

  save = async (
    workspace: WorkspaceMemberEntity,
    options?: QueryBuilderOptions,
  ) => {
    const query = this.databaseService
      .createQueryBuilder(options?.queryRunner)
      .insert()
      .into(WorkspaceMemberEntity)
      .values(workspace)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as WorkspaceMemberEntity;
  };

  existsById = async (id: string): Promise<boolean> => {
    const result = await this.databaseService.query<{
      member_exists_by_email: boolean;
    }>("SELECT * FROM member_exists_by_email($1)", [id]);

    return result[0].member_exists_by_email;
  };

  existsByUserId = async (userId: string, workspaceId: string) => {
    const result = await this.databaseService.query<{
      member_exists_by_user_id: boolean;
    }>("SELECT * FROM member_exists_by_user_id($1, $2)", [userId, workspaceId]);

    return result[0].member_exists_by_user_id;
  };

  softDelete = async (
    id: string,
    options?: QueryBuilderOptions | undefined,
  ): Promise<void> => {
    throw new Error("Method not implemented.");
  };
}
