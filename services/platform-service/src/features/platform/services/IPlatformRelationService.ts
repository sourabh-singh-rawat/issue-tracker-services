export type PlatformRelation = {
  id: string;
  identityId: string;
  relation: string;
};

export type CreatePlatformRelationInput = {
  relation: string;
  identityId: string;
};

export type CreatePlatformRelationOptions = {
  skipAuthorization?: boolean;
};

export type ListPlatformRelationsInput = {
  relation?: string;
  identityId?: string;
};

export interface IPlatformRelationService {
  create: (
    input: CreatePlatformRelationInput,
    identityId: string,
    options?: CreatePlatformRelationOptions,
  ) => Promise<PlatformRelation>;
  getById: (id: string, identityId: string) => Promise<PlatformRelation>;
  list: (input: ListPlatformRelationsInput, identityId: string) => Promise<PlatformRelation[]>;
  delete: (id: string, identityId: string) => Promise<void>;
}
