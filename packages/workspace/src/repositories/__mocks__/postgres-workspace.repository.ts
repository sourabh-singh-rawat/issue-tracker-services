import {
  PostgresTypeormStore,
  QueryBuilderOptions,
} from "@sourabhrawatcc/core-utils";
import { WorkspaceRepository } from "../interface/workspace-repository";
import { WorkspaceEntity } from "../../app/entities";

export class PostgresWorkspaceRepository implements WorkspaceRepository {
  constructor(private databaseService: PostgresTypeormStore) {}

  save = jest
    .fn()
    .mockImplementation(
      async (workspace: WorkspaceEntity, options?: QueryBuilderOptions) => {
        workspace.id = "mock-workspace-id";

        return workspace;
      },
    );

  existsById = jest.fn().mockImplementation(async (id: string) => {
    return true;
  });

  findById = jest.fn().mockImplementation(async (id: string) => {
    const workspace = new WorkspaceEntity();
    workspace.id = "workspace-id";
    workspace.version = 1;

    return workspace;
  });

  find = jest.fn().mockImplementation(async (userId: string) => {
    const workspace = new WorkspaceEntity();
    workspace.id = "workspace-id";
    workspace.version = 1;

    const workspaces = [workspace, workspace];

    return workspaces;
  });

  softDelete = jest
    .fn()
    .mockImplementation(
      async (id: string, options?: QueryBuilderOptions): Promise<void> => {
        throw new Error("Method not implemented.");
      },
    );
}
