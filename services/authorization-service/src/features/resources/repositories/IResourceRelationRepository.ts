import type { DbClient, ResourceRelation } from "@/db";

export type ResourceRelationRepositoryOptions = { tx: DbClient };

export type CreateResourceRelationEntity = {
  resourceType: string;
  key: string;
};

export interface IResourceRelationRepository {
  save(
    entity: CreateResourceRelationEntity,
    options?: ResourceRelationRepositoryOptions,
  ): Promise<ResourceRelation>;
  saveMany(
    entities: CreateResourceRelationEntity[],
    options?: ResourceRelationRepositoryOptions,
  ): Promise<ResourceRelation[]>;
  findByResourceType(resourceType: string): Promise<ResourceRelation[]>;
  findAll(): Promise<ResourceRelation[]>;
  ensureForResourceType(
    resourceType: string,
    keys: string[],
    options?: ResourceRelationRepositoryOptions,
  ): Promise<void>;
}
