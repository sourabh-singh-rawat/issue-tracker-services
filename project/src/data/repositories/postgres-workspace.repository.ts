import { QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { WorkspaceEntity } from "../entities";
import { WorkspaceRepository } from "./interfaces/workspace.repository";
import { RegisteredServices } from "../../app/service-container";

export class PostgresWorkspaceRepository implements WorkspaceRepository {
  private readonly databaseService;

  constructor(serviceContainer: RegisteredServices) {
    this.databaseService = serviceContainer.databaseService;
  }

  save = async (workspace: WorkspaceEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.databaseService
      .createQueryBuilder(WorkspaceEntity, "w", queryRunner)
      .insert()
      .into(WorkspaceEntity)
      .values(workspace)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as WorkspaceEntity;
  };

  existsById = async (id: string) => {
    throw new Error("Method not implemented.");
  };

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    throw new Error("Method not implemented.");
  };
}
