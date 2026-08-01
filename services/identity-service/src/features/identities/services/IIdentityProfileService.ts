import type { DbClient, IdentityProfile } from "@/db";

export interface CreateIdentityProfileOptions {
  tx: DbClient;
  identityId: string;
  firstName: string;
  middleName?: string;
  lastName?: string;
  displayName: string;
  description?: string;
}

export interface IIdentityProfileService {
  createIdentityProfile(options: CreateIdentityProfileOptions): Promise<void>;
  getIdentityProfileByIdentityId(identityId: string): Promise<IdentityProfile>;
  getIdentityProfileByIdpId(idpId: string): Promise<{
    identityId: string;
    idpId: string;
    idpProvider: string;
    firstName: string;
    middleName?: string | null;
    lastName?: string | null;
    displayName: string;
    description?: string | null;
    photoUrl?: string | null;
    createdAt: Date;
  }>;
}
