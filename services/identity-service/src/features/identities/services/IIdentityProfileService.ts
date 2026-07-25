import type { DbClient, IdentityProfile } from "@/db";

export interface CreateIdentityProfileOptions {
  tx: DbClient;
  identityId: string;
  displayName: string;
  description?: string;
}

export interface IIdentityProfileService {
  createIdentityProfile(options: CreateIdentityProfileOptions): Promise<void>;
  getIdentityProfileByIdentityId(identityId: string): Promise<IdentityProfile>;
  getIdentityProfileWithEmail(email: string): Promise<{
    identityId: string;
    email: string;
    idpId?: string | null;
    idpProvider?: string | null;
    displayName: string;
    description?: string | null;
    photoUrl?: string | null;
    createdAt: Date;
  }>;
}
