import { WorkspaceMemberRepository } from "./interface/workspace-member";
import { WorkspaceMemberEntity } from "../entities/workspace-member.entity";
import { Typeorm } from "@issue-tracker/orm";
import { QueryBuilderOptions } from "@issue-tracker/orm";

export class PostgresWorkspaceMemberRepository
  implements WorkspaceMemberRepository
{
  constructor(private orm: Typeorm) {}

  save = async (
    workspace: WorkspaceMemberEntity,
    options?: QueryBuilderOptions,
  ) => {
    const query = this.orm
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

  softDelete = async () => {
    throw new Error("Method not implemented.");
  };
}
