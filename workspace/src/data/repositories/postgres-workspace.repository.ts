import { QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { WorkspaceEntity } from "../entities";
import { WorkspaceRepository } from "./interface/workspace-repository";
import { Services } from "../../app/container.config";

export class PostgresWorkspaceRepository implements WorkspaceRepository {
  private readonly _context;

  constructor(container: Services) {
    this._context = container.dbContext;
  }

  /**
   * Creates a new workspace
   * @param workspace
   * @param options
   * @returns
   */
  save = async (
    workspace: WorkspaceEntity,
    options?: QueryBuilderOptions,
  ): Promise<WorkspaceEntity> => {
    const { id, name, description, ownerUserId } = workspace;
    const queryRunner = options?.queryRunner;
    const query = this._context
      .queryBuilder(WorkspaceEntity, "w", queryRunner)
      .insert()
      .into(WorkspaceEntity)
      .values({ id, name, description, ownerUserId })
      .returning("*");

    return (await query.execute()).generatedMaps[0] as WorkspaceEntity;
  };

  existsById(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  softDelete(id: string, options?: QueryBuilderOptions): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
