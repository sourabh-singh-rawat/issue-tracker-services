import { TypeormStore, QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { WorkspaceMemberInviteRepository } from "./interface/workspace-member-invite.repository";
import { WorkspaceMemberInviteEntity } from "../app/entities/workspace-member-invite.entity";

export class PostgresWorkspaceMemberInviteRepository
  implements WorkspaceMemberInviteRepository
{
  constructor(private readonly store: TypeormStore) {}

  save = async (
    invite: WorkspaceMemberInviteEntity,
    options?: QueryBuilderOptions,
  ) => {
    const query = this.store
      .createQueryBuilder(options?.queryRunner)
      .insert()
      .into(WorkspaceMemberInviteEntity)
      .values(invite)
      .returning("*");

    return (await query.execute())
      .generatedMaps[0] as WorkspaceMemberInviteEntity;
  };

  existsById = async (id: string) => {
    return await WorkspaceMemberInviteEntity.exists({ where: { id } });
  };

  softDelete(id: string, options?: QueryBuilderOptions): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
