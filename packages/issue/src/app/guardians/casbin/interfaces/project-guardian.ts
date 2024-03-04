export interface ProjectGuardian {
  createOwner(userId: string, projectId: string): Promise<void>;
  createAdmin(userId: string, projectId: string): Promise<void>;
  createMember(userId: string, projectId: string): Promise<void>;
}
