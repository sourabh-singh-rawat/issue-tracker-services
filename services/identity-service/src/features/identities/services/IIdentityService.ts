import type { Identity } from "@/db";

export type PublicIdentity = {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
};

export const toPublicIdentity = (identity: Identity): PublicIdentity => ({
  id: identity.id,
  createdAt: identity.createdAt,
  updatedAt: identity.updatedAt,
});

export interface IIdentityService {
  getById(id: string): Promise<PublicIdentity>;
  getIdByExternalId(externalId: string): Promise<string>;
}
