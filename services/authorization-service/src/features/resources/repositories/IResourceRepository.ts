import type { DbClient, Resource } from "@/db";

export type ResourceRepositoryOptions = { tx: DbClient };

export type CreateResourceEntity = {
  type: string;
  key: string;
  name: string;
  description?: string | null;
  isStatic?: boolean;
};

export type UpdateResourceEntity = Partial<
  Pick<Resource, "name" | "description" | "isStatic">
>;

export interface IResourceRepository {
  save(entity: CreateResourceEntity, options?: ResourceRepositoryOptions): Promise<Resource>;
  update(
    id: string,
    entity: UpdateResourceEntity,
    options?: ResourceRepositoryOptions,
  ): Promise<Resource>;
  existsByKey(key: string): Promise<boolean>;
  findById(id: string): Promise<Resource | null>;
  findByKey(key: string): Promise<Resource | null>;
  findByKeys(keys: string[]): Promise<Resource[]>;
  findByType(type: string): Promise<Resource[]>;
  findAll(): Promise<Resource[]>;
  upsertByKey(
    entity: CreateResourceEntity,
    options?: ResourceRepositoryOptions,
  ): Promise<Resource>;
}
