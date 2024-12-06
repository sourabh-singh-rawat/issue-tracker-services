import { CreateWorkspaceInput, Workspace } from "../types";

export interface WorkspaceResolver {
  createWorkspace(ctx: any, input: CreateWorkspaceInput): Promise<string>;
  findWorkspaces(ctx: any): Promise<Workspace[]>;
}
