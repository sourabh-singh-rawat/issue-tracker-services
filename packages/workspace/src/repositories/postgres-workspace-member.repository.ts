import { TypeormStore, QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { WorkspaceMemberRepository } from "./interface/workspace-member";
import { WorkspaceMemberEntity } from "../app/entities/workspace-member.entity";

export class PostgresWorkspaceMemberRepository
  implements WorkspaceMemberRepository
{
  constructor(private store: TypeormStore) {}

  save = async (
    workspace: WorkspaceMemberEntity,
    options?: QueryBuilderOptions,
  ) => {
    const query = this.store
      .createQueryBuilder(options?.queryRunner)
      .insert()
      .into(WorkspaceMemberEntity)
      .values(workspace)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as WorkspaceMemberEntity;
  };

  existsById = async (id: string) => {
    return await WorkspaceMemberEntity.exists({ where: { id } });
  };

  existsByUserId = async (userId: string, workspaceId: string) => {
    return await WorkspaceMemberEntity.exists({
      where: { userId, workspaceId },
    });
  };

  find = async (workspaceId: string) => {
    return await WorkspaceMemberEntity.find({ where: { workspaceId } });
  };

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    throw new Error("Method not implemented.");
  };
}
