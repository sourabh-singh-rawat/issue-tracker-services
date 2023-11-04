export interface WorkspaceGuardian {
  createOwner(userId: string, workspaceId: string): Promise<void>;
}
