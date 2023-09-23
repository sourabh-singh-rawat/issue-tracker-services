import { ServiceResponse } from "@sourabhrawatcc/core-utils";
import { Services } from "../app/container.config";
import { WorkspaceService } from "./interfaces/workspace.service";
import { WorkspaceEntity } from "../data/entities";

export class CoreWorkspaceService implements WorkspaceService {
  private readonly _context;
  private readonly _workspaceRepository;

  constructor(container: Services) {
    this._context = container.dbContext;
    this._workspaceRepository = container.workspaceRepository;
  }

  createWorkspace = async (
    userId: string,
    inputs: {
      name: string;
      description?: string | undefined;
    },
  ): Promise<ServiceResponse<string>> => {
    const newWorkspace = new WorkspaceEntity();
    newWorkspace.name = inputs.name;
    newWorkspace.description = inputs.description;
    newWorkspace.ownerUserId = userId;

    const id = await this._context.transaction(async (queryRunner) => {
      const { id } = await this._workspaceRepository.save(newWorkspace);
      return id;
    });

    return new ServiceResponse({ data: id });
  };

  getAllWorkspaces = async (userId: string) => {
    return new ServiceResponse({ data: "some data", dataCount: 1 });
  };
}
