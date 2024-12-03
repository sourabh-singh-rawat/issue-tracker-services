import { CreateWorkspaceInput } from "../Types";
import { Workspace } from "../Types";

export interface WorkspaceResolver {
  createWorkspace(ctx: any, input: CreateWorkspaceInput): Promise<string>;
  findWorkspaces(ctx: any): Promise<Workspace[]>;
}
