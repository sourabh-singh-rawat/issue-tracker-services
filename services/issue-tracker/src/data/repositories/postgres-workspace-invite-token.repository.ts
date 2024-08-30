import { WorkspaceInviteTokenEntity } from "../entities/workspace-invite-token.entity";
import { QueryBuilderOptions } from "@issue-tracker/orm";
import { Typeorm } from "@issue-tracker/orm";
import { WorkspaceInviteTokenRepository } from "./interfaces/workspace-invite-token.repository";

export class PostgresWorkspaceInviteTokenRepository
  implements WorkspaceInviteTokenRepository
{
  constructor(private readonly orm: Typeorm) {}

  save = async (
    invite: WorkspaceInviteTokenEntity,
    options?: QueryBuilderOptions,
  ) => {
    const query = this.orm
      .createQueryBuilder(options?.queryRunner)
      .insert()
      .into(WorkspaceInviteTokenEntity)
      .values(invite)
      .returning("*");

    return (await query.execute())
      .generatedMaps[0] as WorkspaceInviteTokenEntity;
  };

  existsById = async (id: string) => {
    return await WorkspaceInviteTokenEntity.exists({ where: { id } });
  };

  softDelete(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
