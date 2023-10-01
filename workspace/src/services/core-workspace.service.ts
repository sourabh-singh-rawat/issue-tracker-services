import { ServiceResponse } from "@sourabhrawatcc/core-utils";
import { RegisteredServices } from "../app/service-container";
import { WorkspaceService } from "./interfaces/workspace.service";
import { WorkspaceEntity } from "../data/entities";

export class CoreWorkspaceService implements WorkspaceService {
  private readonly databaseService;
  private readonly workspaceRepository;

  constructor(serviceContainer: RegisteredServices) {
    this.databaseService = serviceContainer.databaseService;
    this.workspaceRepository = serviceContainer.workspaceRepository;
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

    const id = await this.databaseService.transaction(async (queryRunner) => {
      const { id } = await this.workspaceRepository.save(newWorkspace);
      return id;
    });

    return new ServiceResponse({ data: id });
  };

  getAllWorkspaces = async (userId: string) => {
    return new ServiceResponse({ data: "some data", dataCount: 1 });
  };

  getWorkspace = async (id: string) => {
    const doesWorkspaceExists = await this.workspaceRepository.existsById(id);
    if (!doesWorkspaceExists) {
      throw Error("Workspace does not exist");
    }

    const workspace = await this.workspaceRepository.findById(id);

    return new ServiceResponse({ data: workspace });
  };
}
