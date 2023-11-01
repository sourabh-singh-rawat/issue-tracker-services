import {
  DatabaseService,
  QueryBuilderOptions,
} from "@sourabhrawatcc/core-utils";
import { WorkspaceEntity } from "../entities";
import { WorkspaceRepository } from "./interface/workspace-repository";

export class PostgresWorkspaceRepository implements WorkspaceRepository {
  constructor(private databaseService: DatabaseService) {}

  /**
   * Creates a new workspace
   * @param workspace
   * @param options
   * @returns
   */
  save = async (workspace: WorkspaceEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.databaseService
      .createQueryBuilder(queryRunner)
      .insert()
      .into(WorkspaceEntity)
      .values(workspace)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as WorkspaceEntity;
  };

  /**
   * Checks if workspace exists
   * @param id Workspace id
   * @returns boolean indicating if workspace exists
   */
  existsById = async (id: string) => {
    const result = await this.databaseService.query<{
      workspaceExistsById: boolean;
    }>("SELECT * FROM workspace_exists_by_id($1)", [id]);

    return result[0].workspaceExistsById;
  };

  /**
   * Finds a workspace by id
   * @param id
   */
  findById = async (id: string) => {
    const result = await this.databaseService.query<WorkspaceEntity>(
      "SELECT * FROM find_workspace_by_id($1)",
      [id],
    );

    return result[0];
  };

  find = async (userId: string) => {
    const result = await this.databaseService.query<WorkspaceEntity>(
      "SELECT * FROM find_workspaces_by_user_id($1)",
      [userId],
    );

    return result;
  };

  softDelete(id: string, options?: QueryBuilderOptions): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
