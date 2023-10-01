import { QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { WorkspaceMemberEntity } from "../entities/workspace-member.entity";
import { WorkspaceMemberRepository } from "./interface/workspace-member";
import { RegisteredServices } from "../../app/service-container";

export class PostgresWorkspaceMemberRepository
  implements WorkspaceMemberRepository
{
  private readonly logger;
  private readonly databaseService;

  constructor(serviceContainer: RegisteredServices) {
    this.logger = serviceContainer.logger;
    this.databaseService = serviceContainer.databaseService;
  }

  save = async (
    entity: WorkspaceMemberEntity,
    options?: QueryBuilderOptions | undefined,
  ): Promise<WorkspaceMemberEntity> => {
    const { userId, workspaceId } = entity;

    const query = this.databaseService
      .queryBuilder(WorkspaceMemberEntity, "wm", options?.queryRunner)
      .insert()
      .into(WorkspaceMemberEntity)
      .values({ userId, workspaceId })
      .returning(["userId", "workspaceId"]);

    return (await query.execute()).generatedMaps[0] as WorkspaceMemberEntity;
  };

  existsById = async (id: string): Promise<boolean> => {
    throw new Error("Method not implemented.");
  };

  softDelete = async (
    id: string,
    options?: QueryBuilderOptions | undefined,
  ): Promise<void> => {
    throw new Error("Method not implemented.");
  };
}
