import { TypeormStore, QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { WorkspaceMemberEntity } from "../app/entities/workspace-member.entity";
import { WorkspaceMemberRepository } from "./interfaces/workspace-member.repository";
import { UserEntity } from "../app/entities";

export class PostgresWorkspaceMemberRepository
  implements WorkspaceMemberRepository
{
  constructor(private readonly store: TypeormStore) {}

  save = async (
    member: WorkspaceMemberEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.store
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
    return await WorkspaceMemberEntity.find({ where: { workspaceId } });
  };

  softDelete(id: string, options?: QueryBuilderOptions): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
