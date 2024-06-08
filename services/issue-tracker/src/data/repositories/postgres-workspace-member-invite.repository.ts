import { WorkspaceMemberInviteEntity } from "../entities/workspace-member-invite.entity";
import { QueryBuilderOptions } from "@issue-tracker/orm";
import { Typeorm } from "@issue-tracker/orm";
import { WorkspaceMemberInviteRepository } from "./interfaces/workspace-member-invite.repository";

export class PostgresWorkspaceMemberInviteRepository
  implements WorkspaceMemberInviteRepository
{
  constructor(private readonly orm: Typeorm) {}

  save = async (
    invite: WorkspaceMemberInviteEntity,
    options?: QueryBuilderOptions,
  ) => {
    const query = this.orm
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

  softDelete(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
