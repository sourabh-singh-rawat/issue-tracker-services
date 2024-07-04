export interface WorkspaceController {
  createWorkspace: (request: any, reply: any) => Promise<void>;
  createWorkspaceInvite: (request: any, reply: any) => Promise<void>;
  getAllWorkspaces: (request: any, reply: any) => Promise<void>;
  getWorkspaceRoleList: (request: any, reply: any) => Promise<void>;
  getWorkspace: (request: any, reply: any) => Promise<void>;
  confirmWorkspaceInvite: (request: any, reply: any) => Promise<void>;
  getWorkspaceMembers: (request: any, reply: any) => Promise<void>;
  updateWorkspace: (request: any, reply: any) => Promise<void>;
}
