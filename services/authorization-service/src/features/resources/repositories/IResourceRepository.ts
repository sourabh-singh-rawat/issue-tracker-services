import type { DbClient, Resource } from "@/db";

export type ResourceRepositoryOptions = { tx: DbClient };

export type CreateResourceEntity = {
  name: string;
  description?: string | null;
  isSystem?: boolean;
};

export type UpdateResourceEntity = Partial<
  Pick<Resource, "name" | "description" | "isSystem">
>;

export interface IResourceRepository {
  save(entity: CreateResourceEntity, options?: ResourceRepositoryOptions): Promise<Resource>;
  update(
    id: string,
    entity: UpdateResourceEntity,
    options?: ResourceRepositoryOptions,
  ): Promise<Resource>;
  existsByName(name: string, excludeId?: string): Promise<boolean>;
  findById(id: string): Promise<Resource | null>;
  findByName(name: string): Promise<Resource | null>;
  findAll(): Promise<Resource[]>;
  upsertByName(
    entity: CreateResourceEntity,
    options?: ResourceRepositoryOptions,
  ): Promise<Resource>;
}
