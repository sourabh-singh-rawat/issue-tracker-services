export interface IssueGuardian {
  createOwner(userId: string, issueId: string): Promise<void>;
  createAdmin(userId: string, issueId: string): Promise<void>;
  createMember(userId: string, issueId: string): Promise<void>;
}
