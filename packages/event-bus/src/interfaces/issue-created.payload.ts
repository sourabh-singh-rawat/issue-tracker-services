export interface IssueCreatedPayload {
  id: string;
  name: string;
  ownerId: string;
  reporterId: string;
  projectId: string;
  createdAt: Date;
  description?: string;
}
