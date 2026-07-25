import type { User } from "@/db";

export interface IAdminService {
  /**
   * Soft-delete a user and their profile after removing the IdP identity.
   * Profile soft-delete and user soft-delete run in one DB transaction.
   */
  deleteUser(userId: string): Promise<void>;

  /** List all non-deleted users (admin). */
  findUsers(): Promise<User[]>;
}
