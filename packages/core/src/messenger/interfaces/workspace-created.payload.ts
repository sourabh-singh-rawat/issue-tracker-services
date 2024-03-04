export interface WorkspaceCreatedPayload {
  id: string;
  name: string;
  ownerId: string;
  member: {
    userId: string;
    workspaceId: string;
  };
}
