export interface ProjectPayload {
  id: string;
  name: string;
  status: string;
  ownerUserId: string;
  workspaceId: string;
  createdAt: Date;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  updatedAt?: Date;
}
