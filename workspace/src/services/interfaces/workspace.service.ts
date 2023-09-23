import { ServiceResponse } from "@sourabhrawatcc/core-utils";
import { WorkspaceEntity } from "../../data/entities";

export interface WorkspaceService {
  createWorkspace(
    userId: string,
    inputs: {
      name: string;
      description?: string;
    },
  ): Promise<ServiceResponse<string>>;

  getAllWorkspaces(userId: string): Promise<ServiceResponse<string>>;
}
