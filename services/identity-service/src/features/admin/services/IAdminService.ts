import type { PublicIdentity } from "@/features/identities/services/IIdentityService";

export type CreateIdentityOptions = {
  email: string;
  username: string;
  password: string;
  emailVerified: boolean;
  firstName: string;
  middleName?: string;
  lastName?: string;
};

export interface IAdminService {
  /**
   * Create an identity via the IdP admin API, persist a local identity and
   * profile, and schedule UserRegistered. Rolls back the IdP identity if local
   * persistence fails.
   */
  createIdentity(options: CreateIdentityOptions): Promise<PublicIdentity>;

  /**
   * Load the local identity, delete it from the IdP, then soft-delete the local
   * identity and profile (when present) in one DB transaction.
   */
  deleteIdentity(identityId: string): Promise<void>;

  /** List all non-deleted identities (admin). */
  findIdentities(): Promise<PublicIdentity[]>;
}
