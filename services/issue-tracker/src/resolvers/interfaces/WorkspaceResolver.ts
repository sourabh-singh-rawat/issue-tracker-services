import { CreateWorkspaceInput } from "../types";
import { Workspace } from "../types";

export interface WorkspaceResolver {
  createWorkspace(ctx: any, input: CreateWorkspaceInput): Promise<string>;
  getAllWorkspaces(ctx: any): Promise<Workspace[]>;
}
