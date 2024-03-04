import { TypeormStore, QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { WorkspaceMemberEntity } from "../entities/workspace-member.entity";
import { WorkspaceMemberRepository } from "./interfaces/workspace-member.repository";
import { UserEntity } from "../entities";

export class PostgresWorkspaceMemberRepository
  implements WorkspaceMemberRepository
{
  constructor(private readonly postgresTypeormStore: TypeormStore) {}

  save = async (
    member: WorkspaceMemberEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.postgresTypeormStore
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

  find = async (projectId: string, workspaceId: string) => {
    const result = await this.postgresTypeormStore.query<UserEntity>(
      "SELECT * FROM find_workspace_members_by_workspace_id ($1, $2)",
      [projectId, workspaceId],
    );

    return result as UserEntity[];
  };

  softDelete(id: string, options?: QueryBuilderOptions): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
