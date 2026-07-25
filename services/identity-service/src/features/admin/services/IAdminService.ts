import type { Identity } from "@/db";

export interface IAdminService {
  /**
   * Soft-delete an identity and their profile after removing the IdP identity.
   * Profile soft-delete and identity soft-delete run in one DB transaction.
   */
  deleteIdentity(identityId: string): Promise<void>;

  /** List all non-deleted identities (admin). */
  findIdentities(): Promise<Identity[]>;
}
